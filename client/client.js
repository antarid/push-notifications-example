const publicVapidKey =
  'BG0JAC2YzW6aIxNad3B1NoNUjO1ChJ7UvW11ktLywJRO8B07QoKXSXxIrJmf7VIZQRyrmoK4sAiwbTWXBdvtTm0';

(() => {
  document.querySelector('button').addEventListener('click', () => {
    const text =
      document.querySelector('#text').value || `you didn't specify text`;
    const title =
      document.querySelector('#title').value || `you didn't specify title`;
    if ('serviceWorker' in navigator) {
      send({ text, title }).catch(console.error);
    }
  });
})();

async function send(notificationData) {
  console.log('regestring service worker');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service worker registered');

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  console.log('push registered');
  console.log('sending push');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify({ subscription, notificationData }),
    headers: {
      'content-type': 'application/json'
    }
  });

  console.log('push sent');

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
