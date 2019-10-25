import express from 'express';

import { AuthInfoModel } from '@server/database';

import Expo from 'expo-server-sdk';

export const initializeNotificationRoutes = (app: express.Application) => {
    const expo = new Expo();
    const notificationRouter = express.Router();
    app.use('/notification', notificationRouter);

    const handlePushTokens = (message: string, pushToken: string) => {
        // Create the messages that you want to send to clents
        const notifications = [];

        // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
        notifications.push({
            body: message,
            data: { message },
            title: 'Message received!',
            to: pushToken,
        });

        // The Expo push notification service accepts batches of notifications so
        // that you don't need to send 1000 requests to send 1000 notifications. We
        // recommend you batch your notifications to reduce the number of requests
        // and to compress them (notifications with similar content will get
        // compressed).
        const chunks = expo.chunkPushNotifications(notifications);

        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (const chunk of chunks) {
                try {
                    const receipts = await expo.sendPushNotificationsAsync(
                        chunk
                    );
                    console.log(receipts);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    };

    notificationRouter.post('/message/:userId', async (req, res) => {
        const message: string = req.body.message;

        if (message) {
            try {
                const authInfo = await AuthInfoModel.findOne({
                    userId: req.params.userId,
                });
                if (!authInfo) {
                    res.status(404);
                    res.send('User not found.');
                    return;
                }
                handlePushTokens(message, authInfo.pushToken);
                console.log(`Received message, ${message}`);
                res.status(200);
                res.send(`Received message, ${message}`);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send('Error 500');
            }
        } else {
            console.error(`Message can not be undefined or empty`);
            res.status(400);
            res.send('Invalid request');
        }
    });
};