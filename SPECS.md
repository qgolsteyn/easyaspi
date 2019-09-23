# Specifications for Easy as Pi

## Summary

The best way to learn new mathematical concepts is through practice. To this
end, students may work on exercises in their textbook, through in-class
assignments, or online. We believe these resources are lacking in that they
provide a finite number of exercises which may not be sufficient for a student
to fully understand a mathematical concept. Computer-generated mathematical
problems, problems following a particular template with generated numbers,
could an interesting area for innovation in this field. Combined with a
learning method known as spaced repetition, we think we have the ingredients
for an improved platform to teach mathematics.

## Goals

### 1. Display computer-generated mathematical problems to a user on a number of mathematical concepts

### 2. Adapt to the student’s learning rate and display problems adapted to the student’s current knowledge

### 3. Provide a platform for a teacher to manage a classroom and a means for students to communicate with the teacher

## Non-goals

### 1. Provide any sort of dashboard system to display metric

### 2. Any extensive user profile features

## Plan

### Display computer-generated mathematical problems

This is the most critical piece of this project. Hence, effort should be made to
ensure this part of the project is extensible without modification to the rest
of the project.

#### Implementation

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

A particular combination of attributes can be assigned a certain difficulty score. We can then
use an optimization algorithm to find the attributes that match as closely the targetted difficulty
score.

A likely candidate for an optimization algorithm is gradient descent with simulated annealing.
This approach starts with a random solution and greedily attempts to find the best solution (that is a solution with
the requested difficulty score). A quick implementation has shown good results and performance for two variables.

http://www.cs.cmu.edu/afs/cs.cmu.edu/project/learn-43/lib/photoz/.g/web/glossary/anneal.html
http://www.cleveralgorithms.com/nature-inspired/physical/simulated_annealing.html

We might also need to have different categories of problems, with their own rules for difficulty scoring (ie. one set of
rules for addition, one set of rules for multiplication, etc.).

The result of this algorithm is an array of values, which can then be inserted into a string template.

#### Hashing

We will guarrantee some determinism in problem generation by using a seed. By using the same seed and
the same difficulty score, we can guarrantee we can arrive to the same result.

## Adapt to the student's learning

Students can self-report whether or not they solved the problem, and whether or
not they found the problem easy. From there, the server can adjust the student's
proficiency score and select the appropriate next problem.

A key decision should be around how we select the next problem based on previous
effort. This will definitely involve polling a database for the requirement of
the algorithm.

The output of the algorithm should most likely be a hash that could be used by
the problem generation algorithm to generate a new problem. This hash could be
one that was already seen by a student, to ensure that they still remember more
fundamental learning items.

## Real-time communication between two users

Action required for a chat system:

-   Create a new conversation
-   Access conversations
-   Append a new message to a conversation (which would include images)

## Communicate between the mobile app and the server

The mobile app will need to be able to request or notify the server about the
following:

1. Authenticate and create an account
2. Create a classroom
3. Request a list of available math problem categories
4. Request a math problem of a certain type
5. Notify the server if the current problem has been solved or not

In addition, we need to provide real-time communication between two users.

Communication on most points can be achieved via a series of REST endpoints.

## Endpoint API Specs

## Math Problems

1.  GET math-problems/nextProblem?previousResult={previousResult}
    Description:    Retrieves the next problem for a specific user based on their result of the previous problem
    URL:            http://Dunno.com/math-problems/nextProblem?previousResult={previousResult}
    Headers:        userUid: <UUID>

    Response:       HTTP/1.1 200 OK:
                    {
                        "problemArchetype": "arithmetic",
                        "problemType": "addition",
                        "problem": "3 + 4 =",
                        "solution": ["7"],
                        "difficulty": 10,
                        "seed": someHash
                    }

                    HTTP/1.1 400 Bad Request:
                        *  when "previousResult" is missing
                        *  when "previousResult" is not "correct" or "incorrect"

                    HTTP/1.1 404 Not Found:
                        *  when userUid is not found

                    HTTP/1.1 500 Internal Server Error

    Notes:          *  "solution" is an array because we could support solution steps in the future
                    *  "difficulty" is an arbitray number right now, we still need to define the scale of 
                       this and what it means. For now it will just be the average of the numbers on the
                       left side of the equation
                    *  The next problem will be 1 of 2. Either a harder one or an easier one. This is 
                       based on "previousResult". If student got the previous problem correct, the next will
                       be harder and vise versa
                    *  Asynchrously, 2 potential next math problems will be generated after every call of this endpoint.
                       One easier problem for if user gets previous problem wrong, another harder problem for it user gets
                       previous problem correct. This will speed up this endpoint, but we will handle this later


2.  POST math-problems/newTemplate
    Description:    Inserts a new problem template into the database. *This should be used internally only, not by the app*
    URL:            http://Dunno.com/math-problems/newTemplate
    Headers:        N/A

    Request Body:   {
                        "problemArchetype": "Arithmetic",
                        "problemType": "subtraction",
                        "operators": ["-"],
                    }

    Response:       HTTP/1.1 201 Created
                        *  problem template successfully saved in db
                    
                    HTTP/1.1 400 Bad Request
                        *  when any of the fields in the request body are invalid or insufficient given the "problemArchetype"
                    
                    HTTP/1.1 500 Internal Server Error

    Notes:          *  "problemArchetype" is required because in future different types of problems could be supported. For                           example: area questions, equation questions, fraction questions. The other fields will likely be different
                       based on the "problemArchetype". For example an area question will not require "operators"
                    *  The reason I chose this format instead of inputting a string temple like "x - y =" is because we could have
                       any number of operands. Also for a problem that tests BEDMAS (4 + (15/3)) we could have operators or brackets in any place
    

    3.  GET math-problems/allTemplates
        Description:    Gets all problem templates in the database *This should be used interally only, not by the app*
        URL:            http://Dunno.com/math-problems/allTemplates
        Headers:        N/A

        Response:       HTTP/1.1 200 OK:
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
