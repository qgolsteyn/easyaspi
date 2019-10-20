import express from 'express';

import { TeacherTemplateModel, StudentTemplateModel } from '../../database';
import { teacherSerializer, studentSerializer } from 'shared/dist';

export const initializeUsersRoutes = (app: express.Application) => {
    const usersRouter = express.Router();
    app.use('/users', usersRouter);

    // TODO FIX STATUS CODES for all routes

    /* Retrieves a teacher profile by id */
    usersRouter.get('/teacher/:teacherId', async (req, res) => {
        try {
            const teacher = await TeacherTemplateModel.findById(req.params.teacherId);
            if(!teacher) throw new Error(`Could not retrieve teacher with id ${req.params.teacherId}`);
            res.status(200);
            res.json(teacher);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send(`Could not retrieve teacher with id ${req.params.teacherId}`);
        }
    });

    /* Creates a new Teacher */
    usersRouter.post('/teacher', async (req, res) => {
        const teacher = teacherSerializer.parse(req.body);
        if (teacher) {
            try {
                const p = new TeacherTemplateModel(teacher);
                await p.save();
                res.status(200);
                res.json(teacher);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send(e.message);
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });

    /* Updates a Teacher with id */
    usersRouter.put('/teacher/:teacherId', async (req, res) => {
        const teacher = teacherSerializer.parse(req.body);
        if (teacher && teacher.virtualClassroomUid) {
            try {
                const teacherUpdated = await TeacherTemplateModel.findByIdAndUpdate(
                    req.params.teacherId,
                    req.body,
                    {new: true}
                )
                res.status(200);
                res.send(teacherUpdated);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send(`Could not update teacher with id ${req.params.teacherId}`);
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });

    /* Deletes a teacher profile by their id */
    usersRouter.delete('/teacher/:teacherId', async (req, res) => {
        try {
            const teacher = await TeacherTemplateModel.findByIdAndDelete(req.params.teacherId);
            res.status(200);
            res.json(teacher);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send(`Could not delete teacher with id ${req.params.teacherId}`);
        }
    });

    /* Retrieves a student profile by id */
    usersRouter.get('/student/:studentId', async (req, res) => {
        try {
            const student = await StudentTemplateModel.findById(req.params.studentId);
            if(!student) throw new Error(`Could not retrieve student with id ${req.params.studentId}`);
            res.status(200);
            res.json(student);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send(`Could not retrieve student with id ${req.params.studentId}`);
        }
    });

    /* Creates a new Student */
    usersRouter.post('/student', async (req, res) => {
        const student = studentSerializer.parse(req.body);
        if (student) {
            try {
                const p = new StudentTemplateModel(student);
                await p.save();
                res.status(200);
                res.json(student);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send(e.message);
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });

    // TODO FIX serializer
    /* Updates a Student with id */
    usersRouter.put('/student/:studentId', async (req, res) => {
        const student = studentSerializer.parse(req.body);
        console.log(req.body);
        if (student && student.virtualClassroomUid && student.mastery) {
            try {
                const studentUpdated = await StudentTemplateModel.findByIdAndUpdate(
                    req.params.studentId,
                    req.body,
                    {new: true}
                )
                res.status(200);
                res.send(studentUpdated);
            } catch (e) {
                console.error(e);
                res.status(500);
                res.send(`Could not update teacher with id ${req.params.studentId}`);
            }
        } else {
            res.status(400);
            res.send('Invalid request');
        }
    });

    /* Deletes a student profile by id */
    usersRouter.delete('/student/:studentId', async (req, res) => {
        try {
            const student = await StudentTemplateModel.findByIdAndDelete(req.params.studentId);
            res.status(200);
            res.json(student);
        } catch (e) {
            console.error(e);
            res.status(500);
            res.send(`Could not delete student with id ${req.params.studentId}`);
        }
    });
};