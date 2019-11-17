import { IClassroom } from '../../../client/src/shared/models/classroom';
import {
    IProblem,
    ProblemType,
} from '../../../client/src/shared/models/problem';
import { IUser } from '../../../client/src/shared/models/users';
import { IAuthInfo } from '../service/authService';

export const user1: IUser = {
    id: '113015909143620944320',
    registered: true,
    userType: 'student',
    virtualClassroomUid: '113015909143620944320',
};

export const user2: IUser = {
    email: 'test@gmail.com',
    id: '1122334455667788',
    name: 'testUser',
    registered: false,
    userType: 'student',
    virtualClassroomUid: '113015909143620944320',
};

export const user3: IUser = {
    email: 'test@gmail.com',
    id: '1122334455667788',
    registered: false,
};

export const user5: IUser = {
    email: 'test@gmail.com',
    id: '1122334455667788',
    name: 'testUser',
    pushToken: '123456789987654321',
    registered: true,
    userType: 'student',
    virtualClassroomUid: '113015909143620944320',
};

export const masteryDoc1 = {
    _id: '5dcfa29372e21e4adca02e93',
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 9,
            currentDifficultyPoints: 4,
            difficulty: 'g1h2e',
            totalPoints: 123,
        },
        division: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g4m',
            totalPoints: 90,
        },
        equation: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g3h4e',
            totalPoints: 90,
        },
        multiplication: {
            _id: '5dcfa2aa72e21e4adca02ea2',
            currentDifficultyAttempts: 3,
            currentDifficultyPoints: 9,
            difficulty: 'g1h2e',
            totalPoints: 90,
        },
        subtraction: {
            _id: '5dcfa2aa72e21e4adca02ea1',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g5m',
            totalPoints: 90,
        },
    },
    studentId: '113015909143620944320',
};

export const masteryDoc2 = {
    _id: '5dcfa29372e21e4adca02e93',
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 23,
            currentDifficultyPoints: 23,
            difficulty: 'g1h2e',
            totalPoints: 123,
        },
        division: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 9,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90,
        },
        equation: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 8,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90,
        },
        multiplication: {
            _id: '5dcfa2aa72e21e4adca02ea2',
            currentDifficultyAttempts: 10,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90,
        },
        subtraction: {
            _id: '5dcfa2aa72e21e4adca02ea1',
            currentDifficultyAttempts: 11,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90,
        },
    },
    studentId: '113015909143620944320',
};

export const classRoomDoc1 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: ['addition', 'subtraction'],
};

export const classRoomDoc2 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: [],
};

export const classRoomDoc3 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: ['addition', 'volumes'],
};

export const classRoomDoc4: IClassroom = {
    name: 'Test100',
    passcode: '12345',
    problemsForToday: [],
};

export const classRoomDoc5: IClassroom = {
    name: 'Test105',
    passcode: '11122',
    problemsForToday: ['addition'],
};

export const authDoc1: IAuthInfo = {
    aud: 'Test',
    email: 'test@gmail.com',
    email_verified: true,
    name: 'testUser',
    sub: 1122334455667788,
};

export const additionProblem: IProblem = {
    incorrectSolutions: ['9', '11', '12'],
    operands: [9, 1],
    operators: ['+'],
    problem: '9 + 1 =',
    problemType: ProblemType.ADDITION,
    solution: ['10'],
};

export const subtractionProblem: IProblem = {
    incorrectSolutions: ['9', '11', '12'],
    operands: [11, 1],
    operators: ['-'],
    problem: '11 - 1 =',
    problemType: ProblemType.SUBTRACTION,
    solution: ['10'],
};

export const additionTemplate = {
    problemType: ProblemType.ADDITION,
    operator: '+',
    difficultyMap: {
        g1e: {
            operands: [
                {
                    lowerBound: 1,
                    upperBound: 10,
                },
                {
                    lowerBound: 0,
                    upperBound: 2,
                },
            ],
            optExtraOperands: 0,
            multiplesOf: 1,
        },
    },
};

export const subtractionTemplate = {
    problemType: ProblemType.SUBTRACTION,
    operator: '-',
    difficultyMap: {
        g1m: {
            operands: [
                {
                    lowerBound: 5,
                    upperBound: 10,
                },
                {
                    lowerBound: 0,
                    upperBound: 9,
                },
            ],
            optExtraOperands: 0,
            multiplesOf: 1,
        },
    },
};

export const mastery = {
    studentId: 123,
    progress: {
        addition: {
            currentDifficultyAttempts: 23,
            currentDifficultyPoints: 23,
            difficulty: 'g5h',
            totalPoints: 123,
        },
    },
};
