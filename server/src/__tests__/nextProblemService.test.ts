import mockingoose from 'mockingoose';
import { ClassroomModel, MasteryModel } from '../database';
import {
    findPossibleNextProblemTypes,
    getProblemsForClass,
    nextProblemTypeAndDifficulty,
} from '../service/nextProblemService';

import { classRoomDoc1, classRoomDoc2, classRoomDoc3, masteryDoc1, masteryDoc2, user1 } from '../database/mockData';

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






