const mockingoose = require('mockingoose').default;
import { UserModel } from '../database';
import { authDoc1, user2, user3 } from '../database/mockData';
import {
    createUserFromAuthInfo,
    getUserFromId,
    updateUser,
} from '../service/userService';

test('Check if createUserFromAuthInfo returns the right object', async () => {
    mockingoose(UserModel).toReturn(user2, 'save');

    const user = await createUserFromAuthInfo(authDoc1);
    expect(user.email).toEqual('test@gmail.com');
    expect(user.id).toEqual('1122334455667788');
    expect(user.name).toEqual('testUser');
    expect(user.registered).toBeFalsy();
});

test('Check if updateUser updates a user correctly', async () => {
    mockingoose(UserModel)
        .toReturn(user3, 'findOne')
        .toReturn(user2, 'save');

    const user = await updateUser(user2);
    expect(user.email).toEqual('test@gmail.com');
    expect(user.id).toEqual('1122334455667788');
    expect(user.name).toEqual('testUser');
    expect(user.registered).toBeFalsy();
    expect(user.virtualClassroomUid).toEqual('113015909143620944320');
    expect(user.userType).toEqual('student');
});

test('Check if getUserFromId returns correctly', async () => {
    mockingoose(UserModel).toReturn(user2, 'findOne');

    const user = await getUserFromId('1122334455667788');
    expect(user).toBeDefined();

    if (typeof user !== 'undefined') {
        expect(user.email).toEqual('test@gmail.com');
        expect(user.id).toEqual('1122334455667788');
        expect(user.name).toEqual('testUser');
        expect(user.registered).toBeFalsy();
    }
});

// todo fix the spy
// test.skip('Check if sendPushNotification works correctly', async () => {
//     mockingoose(UserModel).toReturn(user5, 'findOne');
//
//     const spy = jest.spyOn(Expo, 'sendPushNotificationsAsync');
//
//     const message: IMessage = {
//         message: 'hello'
//     };
//
//     await sendPushNotification('1122334455667788',
//         '113015909143620944320',
//         message);
//
//     expect(spy).toHaveBeenCalled();
// });
