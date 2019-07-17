const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

const publicVapidKey =
  'BG0JAC2YzW6aIxNad3B1NoNUjO1ChJ7UvW11ktLywJRO8B07QoKXSXxIrJmf7VIZQRyrmoK4sAiwbTWXBdvtTm0';
const privateVapidKey = '8wXu5AkOlaLawcnsr7X4F1mG7qBCnbnKSr5L_My3mlk';

webPush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

app.post('/subscribe', (req, res) => {
  const { subscription, notificationData } = req.body;
  res.status(201).json({});
  const payload = JSON.stringify(notificationData);

  webPush
    .sendNotification(subscription, payload)
    .catch(err => console.log(err));
});

app.listen(5500, () => console.log('server started on 5500'));
