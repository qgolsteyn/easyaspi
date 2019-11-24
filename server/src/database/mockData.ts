import { IAuthInfo } from '@server/service/authService';
import { IClassroom } from '@shared/models/classroom';
import { IProblem, ProblemType, GeometricShape } from '@shared/models/problem';
import { IUser } from '@shared/models/users';

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

export const user6: IUser = {
    email: 'anakin@gmail.com',
    id: '123',
    name: 'Anakin',
    pushToken: '123456789987654321',
    registered: true,
    userType: 'student',
    virtualClassroomUid: '456',
};

export const masteryDoc1 = {
    _id: '5dcfa29372e21e4adca02e93',
    classroomId: '123',
    numDailyAttempts: 1,
    numDailyCorrectAnswers: 1,
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 9,
            currentDifficultyPoints: 4,
            difficulty: 'g1h2e',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
        division: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g4m',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
        multiplication: {
            _id: '5dcfa2aa72e21e4adca02ea2',
            currentDifficultyAttempts: 3,
            currentDifficultyPoints: 9,
            difficulty: 'g1h2e',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
        subtraction: {
            _id: '5dcfa2aa72e21e4adca02ea1',
            currentDifficultyAttempts: 0,
            currentDifficultyPoints: 0,
            difficulty: 'g5m',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
    },
    studentId: '113015909143620944320',
    totalLifetimeAttempts: 500,
    totalLifetimeCorrectAnswers: 500,
};

export const masteryDoc2 = {
    _id: '5dcfa29372e21e4adca02e93',
    classroomId: '123',
    numDailyAttempts: 1,
    numDailyCorrectAnswers: 1,
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 23,
            currentDifficultyPoints: 23,
            difficulty: 'g1h2e',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
        division: {
            _id: '5dcfa2aa72e21e4adca02e32',
            currentDifficultyAttempts: 9,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalPoints: 90,
        },
        multiplication: {
            _id: '5dcfa2aa72e21e4adca02ea2',
            currentDifficultyAttempts: 10,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
        subtraction: {
            _id: '5dcfa2aa72e21e4adca02ea1',
            currentDifficultyAttempts: 11,
            currentDifficultyPoints: 5,
            difficulty: 'g1m',
            totalAttempts: 100,
            totalCorrectAnswers: 100,
        },
    },
    studentId: '113015909143620944320',
    totalLifetimeAttempts: 500,
    totalLifetimeCorrectAnswers: 500,
};

export const masteryDoc3 = {
    _id: '5dcfa29372e21e4adca02e93',
    classroomId: '456',
    numDailyAttempts: 1,
    numDailyCorrectAnswers: 1,
    progress: {
        addition: {
            _id: '5dcfa29372e21e4adca02e94',
            currentDifficultyAttempts: 4,
            currentDifficultyPoints: 4,
            difficulty: 'g1e',
            totalAttempts: 4,
            totalCorrectAnswers: 4,
        },
    },
    studentId: '113015909143620944320',
    totalLifetimeAttempts: 4,
    totalLifetimeCorrectAnswers: 4,
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

export const classRoomDoc4 = {
    _id: '5dd0ddeaa1608611fdb1bb40',
    name: 'Test100',
    numDailyProblems: 20,
    onlineResources: '',
    passcode: '12345',
    problemsForToday: [],
};

export const classRoomDoc5: IClassroom = {
    name: 'Test105',
    numDailyProblems: 20,
    onlineResources: '',
    passcode: '11122',
    problemsForToday: ['addition'],
};

export const classroomDoc6 = {
    _id: '456',
    name: 'Test6',
    numDailyProblems: 20,
    onlineResources: '',
    passcode: '333',
    problemsForToday: [],
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

export const areaTemplate = {
    problemType: ProblemType.AREA,
    difficultyMap: {
        g5m: {
            sides: [
                {
                    lowerBound: 1,
                    upperBound: 30,
                },
                {
                    lowerBound: 1,
                    upperBound: 30,
                },
            ],
            shapes: [GeometricShape.SQUARE, GeometricShape.RECTANGLE],
            cost: {
                lowerBound: 1,
                upperBound: 1,
            },
        },
        g5h: {
            sides: [
                {
                    lowerBound: 5,
                    upperBound: 30,
                },
                {
                    lowerBound: 5,
                    upperBound: 30,
                },
            ],
            shapes: [GeometricShape.SQUARE, GeometricShape.RECTANGLE],
            cost: {
                lowerBound: 5,
                upperBound: 25,
            },
        },
    },
};
