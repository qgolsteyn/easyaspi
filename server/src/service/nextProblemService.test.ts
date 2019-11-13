import {nextProblemTypeAndDifficulty} from './nextProblemService';

const user = new UserModel();
user.id = '5dcb82b31c9d4400002a0e17';
user.userType = 'student';
user.virtualClassroomUid = '5dcb83271c9d4400002a0e77';

test('User is not null', () => {
    expect(nextProblemTypeAndDifficulty(user)).toBeCalledWith(user);
});
