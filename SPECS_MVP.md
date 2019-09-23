# Specifications for the MVP of Easy as π

## Project goals

- To offer a platform for students in Grade 1 to 5 to practice their math skills daily.
- To offer a platform for teachers to track their students' progress and offer insights
on where additional support from the teacher is needed.

###  Defining project success

- Generate math problems of varying difficulty in 5 domain areas.
- Accurately determine the ability level of the student in those 5 domain areas.
- Provide recommendations for the teacher on which skills the student needs to improve in.

### Additional requirements

- Must have a real-time aspect
- Must include third-party integration

## Project opportunities

### Users

| User     | Actions                                                     | Story Ending                                   |
| -------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Students | S1 - Join a teacher virtual classroom's                     | Successfully complete the daily set            |
|          | S2 - Work on a daily math set                               | Get feedback on what to work next              |
|          | S3 - Ask for help from their teacher                        |                                                |
|          | S4 - Access learning material to solve a particular problem |                                                |
|          | S5 - Track their success rate                               |                                                |
|          |                                                             |                                                |
| Teachers | T1 - Create a virtual classroom                             | Know the deficiencies of each student          |
|          | T2 - Prepare the content of the daily math set              | Get recommendations on which area is deficient |
|          | T3 - View individual student progress in each domain area   |                                                |
|          | T4 - View recommendations                                   |                                                |
|          | T5 - Respond to students' request for help                  |                                                |
|          | T6 - Add recommended learning material                      |                                                |

\* italicized actions are not being considered for MVP

### Pains and gains

| Pain                                    | Action      | Gain                               |
| --------------------------------------- | ----------- | ---------------------------------- |
| Authentication is difficult             | S1 T1       | Quickly get set up on the app      |
| Running out of math problems            | S2          | Enough problems for practice       |
| Problems are too difficult              | S2 S3 S4 S5 | Improved learning                  |
| Need practice in certain areas          | S2 S5       | Improved learning                  |
| Need help on math problems              | S3 S4       | Improved learning                  |
| Lose interest in the app                | S2 S5       | Increase retention and better data |
| Know what students need help on         | T4 T5       | Adjust teaching approach           |
| Adapt the app to current class progress | T2          | Adjust teaching approach           |
| Know which students are ahead/lagging   | T4          | Know which students to focus on    |

### Feature