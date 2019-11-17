import mockingoose from 'mockingoose';
import { ClassroomModel, MasteryModel, UserModel } from '../database';
import {
    findPossibleNextProblemTypes,
    getProblemsForClass,
    nextProblemTypeAndDifficulty,
} from '../service/nextProblemService';

const user1 = new UserModel();
user1.virtualClassroomUid = '113015909143620944320';
user1.id = '113015909143620944320';
user1.userType = 'student';

const masteryDoc1 = {
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

const masteryDoc2 = {
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


const classRoomDoc1 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: ['addition', 'subtraction']
};

const classRoomDoc2 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: []
};

const classRoomDoc3 = {
    _id: '113015909143620944320',
    name: 'Test101',
    passcode: '12345',
    problemsForToday: ['addition', 'volumes']
};

test('Check if ProblemsForToday returns the right object', async () => {
    mockingoose(ClassroomModel).toReturn(classRoomDoc1, 'findOne');

    try{
        const problemsForToday = await getProblemsForClass('113015909143620944320');
        expect(problemsForToday).toContain('addition');
        expect(problemsForToday).toContain('subtraction');
    } catch (e) {
        expect(e).toMatch('classroom not found with id 113015909143620944320');
    }
});

test('Check if ProblemsForToday returns empty object correctly', async () => {
    mockingoose(ClassroomModel).toReturn(classRoomDoc2, 'findOne');

    try{
        const problemsForToday = await getProblemsForClass('113015909143620944320');
        expect(problemsForToday.length).toEqual(0);
    } catch (e) {
        expect(e).toMatch('classroom not found with id 113015909143620944320');
    }
});

test('Check if findPossibleNextProblemTypes finds lowest grade correctly', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc1, 'findOne');

    const nextProblemTypes = await findPossibleNextProblemTypes('113015909143620944320');
    expect(nextProblemTypes[nextProblemTypes.length - 1]).toEqual('g1h2e');
});

test('Check if findPossibleNextProblemTypes finds lowest grade correctly', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc1, 'findOne');

    const nextProblemTypes = await findPossibleNextProblemTypes('113015909143620944320');
    expect(nextProblemTypes[nextProblemTypes.length - 1]).toEqual('g1h2e');
});


test('Check if findPossibleNextProblemTypes finds all problemTypes with minimum difficulty correctly', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc2, 'findOne');

    const nextProblemTypes = await findPossibleNextProblemTypes('113015909143620944320');
    expect(nextProblemTypes).toContain('equation');
    expect(nextProblemTypes).toContain('division');
    expect(nextProblemTypes).toContain('subtraction');
    expect(nextProblemTypes).toContain('multiplication');
});


test('Check if findPossibleNextProblemTypes sorts problem types correctly for doc2', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc2, 'findOne');

    const nextProblemTypes = await findPossibleNextProblemTypes('113015909143620944320');

    expect(nextProblemTypes[0]).toContain('equation');
    expect(nextProblemTypes[1]).toContain('division');
    // tslint:disable-next-line:no-magic-numbers
    expect(nextProblemTypes[2]).toContain('multiplication');
    // tslint:disable-next-line:no-magic-numbers
    expect(nextProblemTypes[3]).toContain('subtraction');
});

test('Check if findPossibleNextProblemTypes sorts problem types correctly for doc1', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc1, 'findOne');

    const nextProblemTypes = await findPossibleNextProblemTypes('113015909143620944320');

    expect(nextProblemTypes[0]).toContain('multiplication');
    expect(nextProblemTypes[1]).toContain('addition');
});

test('1 Check if nextProblemTypeAndDifficulty finds the matching with ProblemsForToday from classroom', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc1, 'findOne');
    mockingoose(ClassroomModel).toReturn(classRoomDoc1, 'findOne');

    const nextProblem = await nextProblemTypeAndDifficulty(user1);

    expect(JSON.parse(JSON.stringify(nextProblem))).toMatchObject({difficulty: 'g1h2e', problemType: 'addition'});
});

test('2 Check if nextProblemTypeAndDifficulty returns correctly when ProblemsForToday is empty from classroom', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc1, 'findOne');
    mockingoose(ClassroomModel).toReturn(classRoomDoc2, 'findOne');

    const nextProblem = await nextProblemTypeAndDifficulty(user1);

    expect(JSON.parse(JSON.stringify(nextProblem))).toMatchObject({difficulty: 'g1h2e', problemType: 'multiplication'});
});

test('3 Check if nextProblemTypeAndDifficulty returns correctly when there is no matching with ProblemsForToday from classroom', async () => {
    mockingoose(MasteryModel).toReturn(masteryDoc2, 'findOne');
    mockingoose(ClassroomModel).toReturn(classRoomDoc3, 'findOne');

    const nextProblem = await nextProblemTypeAndDifficulty(user1);

    expect(JSON.parse(JSON.stringify(nextProblem))).toMatchObject({difficulty: 'g1m', problemType: 'equation'});
});






