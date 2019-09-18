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

A likely candidate for an optimization algorithm is gradient descent with random restarts or simulated annealing.
This approach starts with a random solution and greedily attempts to find the best solution (that is a solution with
the requested difficulty score). A quick implementation has shown good results and performance for two variables.

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
