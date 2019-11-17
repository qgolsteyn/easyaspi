import mockingoose from 'mockingoose';
import { ClassroomModel, MasteryModel } from '../database';
import { createClassroom, authenticateToClassroom, getStudents } from '@server/service/classroomService';
import { user1, classRoomDoc4 } from '../database/mockData';
import { model } from 'mongoose';

test('Check if createClassroom creates classroom correctly', async () => {
    mockingoose(ClassroomModel).toReturn({name: 'Test100', passcode: '12345'}, 'save');
});