import { IClassroom } from '@shared/models/classroom';

export const user1 = {
    id: '113015909143620944320',
    userType: 'student',
    virtualClassroomUid: '113015909143620944320'
};

export const masteryDoc1 = {
    _id: '5dcfa29372e21e4adca02e93',
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 9,
            currentDifficultyPoints: 4,
            difficulty: 'g1h2e',
            totalPoints: 123
        },
        subtraction: {
            _id: '5dcfa2aa72e21e4adca02ea1',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g5m',
            totalPoints: 90
        },
        // tslint:disable-next-line:object-literal-sort-keys
        multiplication: {
            _id: '5dcfa2aa72e21e4adca02ea2',
            currentDifficultyAttempts: 3,
            currentDifficultyPoints: 9,
            difficulty: 'g1h2e',
            totalPoints: 90
        },
        division: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g4m',
            totalPoints: 90
        },
        equation: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g3h4e',
            totalPoints: 90
        },
    },
    studentId: '113015909143620944320'
};

export const masteryDoc2 = {
    _id: '5dcfa29372e21e4adca02e93',
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 23,
            currentDifficultyPoints: 23,
            difficulty: 'g1h2e',
            totalPoints: 123
        },
        subtraction: {
            _id: '5dcfa2aa72e21e4adca02ea1',
            currentDifficultyAttempts: 11,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90
        },
        // tslint:disable-next-line:object-literal-sort-keys
        multiplication: {
            _id: '5dcfa2aa72e21e4adca02ea2',
            currentDifficultyAttempts: 10,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90
        },
        division: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 9,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90
        },
        equation: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 8,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90
        },
    },
    studentId: '113015909143620944320'
};


export const classRoomDoc1 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: ['addition', 'subtraction']
};

export const classRoomDoc2 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: []
};

export const classRoomDoc3 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: ['addition', 'volumes']
};

export const classRoomDoc4:IClassroom = {
    name: 'Test100',
    passcode: '12345',
    problemsForToday: []
};

export const classRoomDoc5:IClassroom = {
    name: 'Test105',
    passcode: '11122',
    problemsForToday: ['addition']
};