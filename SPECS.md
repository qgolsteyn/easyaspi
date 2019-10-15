# Easy as π Specifications

<details>
<summary>Table of content</summary>
- [Easy as π Specifications](#easy-as-%cf%80-specifications)
- [Project goals](#project-goals)
  - [Defining project success](#defining-project-success)
  - [Additional requirements](#additional-requirements)
- [Scoping](#scoping)
  - [UX perspective](#ux-perspective)
    - [Personas](#personas)
    - [Brainstorming user actions](#brainstorming-user-actions)
    - [Pains and gains](#pains-and-gains)
    - [Opportunity statements](#opportunity-statements)
  - [BC Math curriculum (Grade 1 to 5)](#bc-math-curriculum-grade-1-to-5)
- [User stories](#user-stories)
- [Technical considerations](#technical-considerations)
  - [Generating math problems](#generating-math-problems)
    - [Rule-based generation](#rule-based-generation)
    - [Categorizing student's ability](#categorizing-students-ability)
    - [Formulating rules as constraints](#formulating-rules-as-constraints)
      - [Hashing](#hashing)
  - [Adapting to the student's performance](#adapting-to-the-students-performance)
  - [Fetching the next math problem](#fetching-the-next-math-problem)
    - [API](#api)
- [Bibliography](#bibliography)
</details>

# Project goals

- To offer a platform for students in Grade 1 to 5 to practice their math skills daily.
- To offer a platform for teachers to track their students' progress and offer insights
on where additional support from the teacher is needed.

##  Defining project success

- Generate math problems of varying difficulty in 5 domain areas.
- Accurately determine the ability level of the student in those 5 domain areas.
- Provide recommendations for the teacher on which skills the student needs to improve in.

## Additional requirements

- Must have a real-time aspect
- Must include third-party integration

# Scoping

<details>
<summary>UX perspective</summary>

## UX perspective

### Personas

**Students**

<details>
<summary>Ewen (Grade 3 student)</summary>
Ewen loves video games and can quickly get addicted to games on his parent's phones.
He is not very interested in school and lags behing compared to his classmates.
</details>
<details>
<summary>Enora (Grade 5 student)</summary>
Enora generally likes school, but thinks she is not good at math. She rapidly gives up
on math problems, and think she will never improve. At school, she prefers arts and English class.
</details>

<details>
<summary>Gareth (Grade 1 student)</summary>
Gareth loves the thrill of solving puzzles. He is considered brilliant at school, and is quite bored in 
class.
</details>

**Teacher**

<details>
<summary>Jess (Grade 3 teacher)</summary>
Jess is a teacher in a class of 32 students. She struggles to find time to help all her students individually and
she is worried that if she spent more time, the rest of her class would not do anything productive.
</details>

<details>
<summary>George (Grade 5 teacher for students with disabilities)</summary>
George has 5 students in his class with varying levels of cognitive disabilities. His students are generally quite
attentive, but their knowledge and skill level are quite different, and he sometimes has difficulty making his classes
interesting and interactive.
</details>

<details>
<summary>Annie (Parent of a Grade 2 student)</summary>
Annie is a consultant in an engineering firm and has difficulty coming home early most days of the week. She
wants to make sure her son gets enough practice in mathematics to make sure he does well in school.
She wants him to learn how to study, but she doesn't know where to start and is often not around to help him.
</details>

### Brainstorming user actions

| User     | Actions                                                     | Story Ending                                   |
| -------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Students | S1 - Join a teacher virtual classroom                       | Successfully complete the daily set            |
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

| Pain                                      | Action      | Gain                                      |
| ----------------------------------------- | ----------- | ----------------------------------------- |
| Authentication is difficult               | S1 T1       | Quickly get set up on the app             |
| Getting students on the app is difficult  | S1 T1       | Quickly get set up on the app             |
| Running out of math problems              | S2          | Enough problems for practice              |
| Problems are too difficult                | S2 S3 S4 S5 | Improved learning                         |
| Need practice in certain areas            | S2 S5       | Improved learning                         |
| Need help on math problems                | S3 S4       | Improved learning                         |
| Understanding how well you are performing | S5          | Increased retention and improved learning |
| Lose interest in the app                  | S2 S5       | Increased retention and better data       |
| Know what students need help on           | T3 T4 T5    | Adjust teaching approach                  |
| Adapt the app to current class progress   | T2 T6       | Adjust teaching approach                  |
| Know which students are ahead/lagging     | T3 T4       | Know which students to focus on           |

### Opportunity statements

- How might we make authenticating simple for students?
- How might we make creating a classroom simple for teachers?
- How might we provide enough math problems for students to practice on?
- How might we make sure that the problems are at the correct level of difficulty?
- How might we adapt the app to particular student's deficiencies?
- How can we inform students regarding their performance?
- How can we ensure that students remain engaged in the app ?
- How can we inform the teacher on the areas that students need more help?
- How can we inform the teacher on the students that are ahead/behind the rest of the class?
- How can we let the teacher influence the problems the students are working on?
</details>

<details>
<summary>BC Math curriculum (1-5)</summary>

## BC Math curriculum (Grade 1 to 5)

The BC math curriculum from grade 1 to 5 is focused on building mathematic literacy in the following areas:

- Counting, and number decomposition
- Fractions and decimals
- Patterns (repeating, increasing, decreasing)
- Addition, substraction, multiplication and division
- Financial literacy
- Equations with an unknown number
- Probability
- 2D shapes (describing them, perimeter)

Generally, those concepts remain in focus for each year level, with increased complexity. The curriculum is very precise
regarding the scope of learning for each year level (eg. addition to 20 in Grade 1).

This information could be used to determine which problem to show to students based on their estimated year level.

More information can be found here: https://curriculum.gov.bc.ca/curriculum/mathematics/

</details>

# User stories

# Technical considerations

<details>
<summary>
Generating math problems
</summary>

## Generating math problems

This is the most critical piece of this project. Hence, effort should be made to
ensure this part of the project is extensible without modification to the rest
of the project.

### Rule-based generation

The BC Math curriculum from grade 1 to 5 can easily be transformed into a list of requirements. The curriculum
is divided into 5 major archetypes, each containing a set of problem types.

At each year level, the curriculum specifies a certain number of constraints particular to that year. For example,
in Grade 1, students are expected to be able to add numbers up to 10. These constraints could be used to determine
which problem to show to students.

### Categorizing student's ability

To determine the correct problem to show the student, students will be categorized according to their grade and level
within their grade. There are 3 levels per grade, low, medium, and high level. The rules selected to generate a problem
of a particular type will vary depending on the student's assigned category.

### Formulating rules as constraints

Each rule of a particular problem type can be formulated as a set of controlled and derived variables.

For example, for addition in Grade 1, students are expected to be able to add a "large" number with 
a "small" number to values up to 9. This can be formulated as such, assuming an addition takes the form a + b = c.

Controlled variables:

- `5 < c < 9`
- `0 < b < 3`

Derived variables:

- `a = c - b`

Controlled variables have their domain specified, while derived variables are formulated as an equation consisting of
controlled variables.

An algorithm can pick a random value for the controlled variables, and then compute derived variables as needed.

#### Hashing

We need to ensure some determinism when generating math problems. This can be achieved by seeding the random number
generator.

## Adapting to the student's performance

Depending on the student performance, we can adjust the category the student is in to vary the problems difficulty.

**Important** more research is needed in this area to find the best approach to encourage learning. We want to strike
a good balance between giving problems that are not too difficult, and problems that are not too easy.

Students score or loose points depending on whether they get problems right or wrong.
Performance categories (eg. Grade 3 medium level) each allow students a score up to 10 points. 
If a students exceeds these 10 points, they "graduate" to the next category (here, Grade 3 high level).
If a students goes below zero point, they are demoted to the level below (here Grade 3 low level).

Students will receive one point for each correct answer, and loose 2 points for each wrong answer.

It is important to note that these scores are given per problem type. A student may be Grade 2 high on addition,
but Grade 1 medium on substraction.

</details>


<details>
<summary>
Fetching the next math problem
</summary>

## Generating and Fetching Problems (take from Q8 of M2)

- MathProblemsDB with 2 collections: problemTemplates, generatedProblems
- Retrieve all templates of all problemTypes
- Generate n problems for each difficulty of each problemType
- Store genereated problems in generatedProblems collection
- Call GET endpoint to retrieve user's next problem, will pull from this collection
- Each user has an index for each problem type
- UI calls POST endpoint to tell backend if user got question right or wrong
- Update user's index, points and difficulty for this problem type based on the result
- If GET endpoint returns the n-1th problem, trigger async generation to create another
  n problems only for this difficulty tier

### API

1.  `GET /math/nextProblem`

    - Description:    Retrieves the next problem for a specific user
    - URL:            http://localhost:3000/math/nextProblem
    - Headers:        
        ```json
            {
                userId: ObjectId
            }
            ```

    - Response:       
        - `HTTP/1.1 200 OK`
            Content-Type: application/json
            ```json 
            {
                "problemArchetype": "arithmetic",
                "problemType": "addition",
                "problem": "3 + 4 =",
                "solution": ["7"],
                "difficulty": "g1m"
            }
            ```
            if query not matched, empty json will be returned

        - `HTTP/1.1 500 Internal Server Error`
    
    - Notes:          
        *  "solution" is an array because we could support solution steps in the future

2.  `POST /users/student/result`

    - Description:    Informs the backend whether the user got the previous question right or wrong
    - URL:            http://localhost:3000/users/student/result
    - Headers:        
        ```json
            {
                userId: ObjectId
            }
            ```

    - Response:       
        - `HTTP/1.1 200 OK`
            Content-Type: application/json
            ```json 
            {
                "problemArchetype": "arithmetic",
                "problemType": "addition",
                "difficulty": "g1m",
                "isCorrect": true
            }
            ```

        - `HTTP/1.1 500 Internal Server Error`

2.  `GET /users/teacher/{teacherId}`

    - Description:    Retrieves a teacher profile by their id
    - URL:            http://localhost:3000/users/teacher/{teacherId}
    - Headers:        N/A

    - Response:       
        - `HTTP/1.1 200 OK`
          Content-Type: application/json
            ```json 
            {
                "name": "Obi-wan Kenobi",
                "email": "jedi@gmail.com",
                "virtualClassroomId": "5d9991271c9d440000d47e08"
            }
            ```

        - `HTTP/1.1 404 Not Found`
            *  when teacherId does not

        - `HTTP/1.1 500 Internal Server Error`

3.  `POST /users/teacher`

    - Description:    Creates a new Teacher user
    - URL:            http://localhost:3000/users/teacher
    - Headers:        
        ```json
        {
            Content-Type: application/json
        }
        ```
    
    - Request Body:
        ```json
        {
            "name": "Obi-wan Kenobi",
            "email": "jedi@gmail.com"
        }
        ```

    - Response:       
        - `HTTP/1.1 201 Created`
          Location: /user/teacher/5d946f761c9d440000d525ff

        - `HTTP/1.1 400 Bad Request`
            *  when either name or email is empty or blank

        - `HTTP/1.1 500 Internal Server Error`

4.  `PUT /users/teacher/{teacherId}`

    - Description:    Updates an existing Teacher user
    - URL:            http://localhost:3000/users/teacher/{teacherId}
    - Headers:        
        ```json
        {
            Content-Type: application/json
        }
        ```
    
    - Request Body:
        ```json
        {
            "name": "Master Yoda",
            "email": "greenguy@gmail.com",
            "virtualClassroomId": "5d9991271c9d440000d47e09"
        }
        ```

    - Response:       
        - `HTTP/1.1 204 No Content`

        - `HTTP/1.1 400 Bad Request`
            *  when either name, email, or virtualClassroomId is empty or blank

        - `HTTP/1.1 404 Not Found`
            *  when teacherId does not exist

        - `HTTP/1.1 500 Internal Server Error`

5.  `DELETE /users/teacher/{teacherId}`

    - Description:    Deletes a teacher profile by their id
    - URL:            http://localhost:3000/users/teacher/{teacherId}
    - Headers:        N/A

    - Response:       
        - `HTTP/1.1 204 No Content`

        - `HTTP/1.1 404 Not Found`
            *  when teacherId does not exist

        - `HTTP/1.1 500 Internal Server Error`

6.  `GET /users/student/{studentId}`

    - Description:    Retrieves a student profile by their id
    - URL:            http://localhost:3000/users/student/{studentId}
    - Headers:        N/A

    - Response:       
        - `HTTP/1.1 200 OK`
          Content-Type: application/json
            ```json 
            {
                "name": "Anakin Skywalker",
                "virtualClassroomId": "5d9991271c9d440000d47e08",
                "mastery": [
                    {
                        "problemType": "addition",
                        "difficulty": "g1m",
                        "index": 7,
                        "currentDifficultyPoints": 3,
                        "totalPoints": 13 
                    },
                    {
                        "problemType": "subtraction",
                        "difficulty": "g1e",
                        "index": 2,
                        "currentDifficultyPoints": 2,
                        "totalPoints": 2 
                    }
                ]
            }
            ```

        - `HTTP/1.1 404 Not Found`
            *  when studentId does not exist

        - `HTTP/1.1 500 Internal Server Error`

7.  `POST /users/student`

    - Description:    Creates a new Student user
    - URL:            http://localhost:3000/users/student
    - Headers:        
        ```json
        {
            Content-Type: application/json
        }
        ```
    
    - Request Body:
        ```json
        {
            "name": "Anakin Skywalker",
        }
        ```

    - Response:       
        - `HTTP/1.1 201 Created`
          Location: /user/student/5d980fa0c5edee2d50cd5a82

        - `HTTP/1.1 400 Bad Request`
            *  when name is empty or blank

        - `HTTP/1.1 500 Internal Server Error` 

8.  `PUT /users/student/{studentId}`

    - Description:    Updates a Student user
    - URL:            http://localhost:3000/users/student/{studentId}
    - Headers:        
        ```json
        {
            Content-Type: application/json
        }
        ```
    
    - Request Body:
        ```json
        {
            "name": "Anakin Skywalker",
            "virtualClassroomId": "5d9991271c9d440000d47e08",
            "mastery": [
                    {
                        "problemType": "addition",
                        "difficulty": "g1h",
                        "index": 5,
                        "currentDifficultyPoints": 1,
                        "totalPoints": 21 
                    },
                    {
                        "problemType": "subtraction",
                        "difficulty": "g1m",
                        "index": 4,
                        "currentDifficultyPoints": 4,
                        "totalPoints": 14 
                    }
                ]
        }
        ```

    - Response:       
        - `HTTP/1.1 204 No Content`

        - `HTTP/1.1 400 Bad Request`
            *  when name, virtualClassroomId is empty or blank
            *  when mastery is null or missing fields

        - `HTTP/1.1 404 Not Found`
            *  when studentId does not exist

        - `HTTP/1.1 500 Internal Server Error` 

9.  `DELETE /users/student/{studentId}`

    - Description:    Updates a Student user
    - URL:            http://localhost:3000/users/student/{studentId}
    - Headers:        N/A

    - Response:       
        - `HTTP/1.1 204 No Content`

        - `HTTP/1.1 404 Not Found`
            *  when studentId does not exist

        - `HTTP/1.1 500 Internal Server Error` 

</details>



# Bibliography

Project planning approach inspired by https://medium.com/@ClrMobile/planning-a-minimum-viable-product-a-step-by-step-guide-6f387d657870

