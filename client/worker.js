console.log('service worker loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('push recieved');
  self.registration.showNotification(data.title, {
    body: data.text,
    icon: 'https://gc.onliner.by/images/logo/onliner_logo.v3.png'
  });
});
