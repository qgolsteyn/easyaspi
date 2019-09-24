# Easy as π Specifications

**Table of content**
- [Easy as π Specifications](#easy-as-%cf%80-specifications)
- [Project goals](#project-goals)
  - [Defining project success](#defining-project-success)
  - [Additional requirements](#additional-requirements)
- [Scoping](#scoping)
  - [Personas](#personas)
  - [Brainstorming user actions](#brainstorming-user-actions)
  - [Pains and gains](#pains-and-gains)
  - [Opportunity statements](#opportunity-statements)
- [User stories](#user-stories)
- [Technical considerations](#technical-considerations)
  - [Generating math problems](#generating-math-problems)
      - [Number generation](#number-generation)
      - [Difficulty score](#difficulty-score)
      - [Hashing](#hashing)
      - [Problem template](#problem-template)
  - [Fetching the next math problem](#fetching-the-next-math-problem)
    - [API](#api)
- [Bibliography](#bibliography)

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

## Personas

**Students**

<details>
<summary>Jess (Grade 1 student)</summary>
Details go here.
</details>
<details>
<summary>Jess (Grade 1 student)</summary>
</details>

<details>
<summary>Jess (Grade 1 student)</summary>
</details>

**Teacher**

<details>
<summary>Jess (Grade 1 student)</summary>
</details>

<details>
<summary>Jess (Grade 1 student)</summary>
</details>

<details>
<summary>Jess (Grade 1 student)</summary>
</details>

## Brainstorming user actions

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

## Pains and gains

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

## Opportunity statements

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

#### Number generation

_“In mathematics the art of asking questions is more valuable than solving
problems” — Cantor (1867)_

For this project, we can look at what the literature has to say about
mathematical problem generation.

An interesting book, called _The Art of Problem Posing_, explores the idea of
problems as being defined by a list of attributes. Comprehension of the problem
can be achieved by changing the attributes. We could perhaps use this idea for
generating mathematical problems of increasing difficulty, by identifying
attributes of a problem and changing them to create new problems.

For example:

-   All values are positive, some values are positive, all values are negative
-   There are two terms at the left of the equal sign, three, four

Attributes can be represented by a set of numerical variables and their domain. A particular combination
of values for each variable can be assigned a certain difficulty score. We can then
use an optimization algorithm to find the attributes that match as closely the targetted difficulty
score.

A likely candidate for an optimization algorithm is gradient descent with simulated annealing.
This approach starts with a random assignment and greedily attempts to find the best assignment (that is an assignment with
the requested difficulty score). A quick implementation has shown good results and performance for two variables.

http://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/glossary/anneal.html
http://www.cleveralgorithms.com/nature-inspired/physical/simulated_annealing.html

The result of this algorithm is an array of values, which can then be inserted into a string template.

#### Difficulty score

The challenge is to be able to determine which numerical values to select. We describe an assignment through its
difficulty score, generated by a difficulty function. The implementation of this function is critical to ensure
the success of this project.

A prototype using a neural net has shown promising results and could be worth exploring. The simple solution would be
to hard code rules in the implementation.

It is important to note that the optimization algorithm may not be able to find the best solution depending
on the output of the difficulty function.

#### Hashing

We will guarrantee some determinism in problem generation by using a seed. By using the same seed and
the same difficulty score, we can guarrantee we can arrive to the same result.

#### Problem template

Using value assignments from the step described above, a template function will return an object
representing a math problem. This object should include the problem, solution with steps, 
difficulty score, and seed.

```typescript
interface IMathProblem {
    problemType: string;
    problem: string;
    solution: string[];
    difficulty: number;
    seed: string;
}
```

The template should be a function accepting an array of values. It is responsible for
incorporating the values inside a string representing the math problem. It may derive
additional values if necessary (for example to generate a polynomial when given the
value of the factors).  

</details>


<details>
<summary>
Fetching the next math problem
</summary>

## Fetching the next math problem

### API

1.  `GET math-problems/nextProblem?previousResult={previousResult}`

    - Description:    Retrieves the next problem for a specific user based on their result of the previous problem
    - URL:            http://Dunno.com/math-problems/nextProblem?previousResult={previousResult}
    - Headers:        
        ```json
        {
            "userUid": <UUID>
        }
        ```

    - Response:       
        - `HTTP/1.1 200 OK`
            ```json 
            {
                "problemArchetype": "arithmetic",
                "problemType": "addition",
                "problem": "3 + 4 =",
                "solution": ["7"],
                "difficulty": 10,
                "seed": someHash
            }
            ```

        - `HTTP/1.1 400 Bad Request`
            *  when "previousResult" is missing
            *  when "previousResult" is not "correct" or "incorrect"

        - `HTTP/1.1 404 Not Found`
            *  when userUid is not found

        - `HTTP/1.1 500 Internal Server Error`
    

    - Notes:          
        *  "solution" is an array because we could support solution steps in the future
        *  "difficulty" is an arbitray number right now, we still need to define the scale of 
           this and what it means. For now it will just be the average of the numbers on the
           left side of the equation
        *  The next problem will be 1 of 2. Either a harder one or an easier one. This is 
           based on "previousResult". If student got the previous problem correct, the next will
           be harder and vise versa
        *  Asynchrously, 2 potential next math problems will be generated after every call of this endpoint.
           One easier problem for if user gets previous problem wrong, another harder problem for it user gets
           previous problem correct. This will speed up this endpoint, but we will handle this later


2.  `POST math-problems/newTemplate`
   
    - Description:    Inserts a new problem template into the database. *This should be used internally only, not by the app*
    - URL:            http://Dunno.com/math-problems/newTemplate
    - Headers:        `N/A`

    - Request Body:
        ```json
        {
            "problemArchetype": "Arithmetic",
            "problemType": "subtraction",
            "operators": ["-"],
        }
        ```

    - Response: 
        - `HTTP/1.1 201 Created`
            *  problem template successfully saved in db
                    
        - `HTTP/1.1 400 Bad Request`
            *  when any of the fields in the request body are invalid or insufficient given the "problemArchetype"
    
        - `HTTP/1.1 500 Internal Server Error`

    - Notes:          
        *  "problemArchetype" is required because in future different types of problems could be supported. For       
            example: area questions, equation questions, fraction questions. The other fields will likely be different
            based on the "problemArchetype". For example an area question will not require "operators"
        *  The reason I chose this format instead of inputting a string temple like "x - y =" is because we could have
            any number of operands. Also for a problem that tests BEDMAS (4 + (15/3)) we could have operators or brackets
            in any place
    

3.  GET math-problems/allTemplates

    - Description:    Gets all problem templates in the database *This should be used interally only, not by the app*
    - URL:            http://Dunno.com/math-problems/allTemplates
    - Headers:        `N/A`

    - Response: 
        - `HTTP/1.1 200 OK`
            ```json 
            {
                "arithmetic": [
                    {
                        "problemType": "addition",
                        "operators": ["+"]
                    },
                    {
                        "problemType": "subtraction",
                        "operators": ["-"]
                    },
                    {
                        "problemType": "multiplication",
                        "operators": ["*"]
                    },
                    {
                        "problemType": "division",
                        "operators": ["/"]
                    },
                    {
                        "problemType": "bedmas",
                        "operators": ["+", "-", "*", "/", "^", "(", ")"]
                    }
                ],
                "fractions": [
                    {
                        "problemType": "addition",
                        "operators": ["+"]
                    }
                ],
                "Geometry": [
                    {
                        "problemType": "area",
                        "shape": ["circle", "square", "rectangle", "triangle"]
                    }
                ]
            }
            ```
</details>



# Bibliography

Project planning approach inspired by https://medium.com/@ClrMobile/planning-a-minimum-viable-product-a-step-by-step-guide-6f387d657870

