<h1 align="center">
  Rover Control Plane
</h1>

## Introduction

A squad of robotic rovers are to be landed by NASA on a plateau on
Mars. This plateau, which is curiously rectangular, must be navigated
by the rovers so that their on-board cameras can get a complete view
of the surrounding terrain to send back to Earth.
A rover's position and location is represented by a combination of x
and y co-ordinates and a letter representing one of the four cardinal
compass points. The plateau is divided up into a grid to simplify
navigation.

An example position might be <b>0, 0, N</b>, which means the
rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters.
The possible letters are <b>'L', 'R' and 'M'</b>. <b>'L' and 'R'</b> makes the rover spin 90 degrees left or right respectively, without moving from
its current spot. <b>'M'</b> means move forward one grid point, and maintain
the same heading.

### Example

```
PLATEAU_X_SIZE PLATEAU_Y_SIZE
ROVER_X_POSITION ROVER_Y_POSITION ROVER_DIRECTION
ROVER_MOVEMENT_INSTRUCTIONS
```

#### Input

```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

#### Output

```
1 3 N
5 1 E
```

## Getting Started

> A file must be passed as a parameter to the application.

### Requirements

- Node.js
- Yarn

#### Run installation & tests

> Installs the project dependencies and runs the tests.

```
yarn
yarn test
```

#### Run installation & development mode

> Installs the project dependencies and runs the application in development mode.

```
yarn
yarn start:dev docs/input1.txt
```

#### Run installation & production mode

> Installs the project dependencies. Build and runs the production application mode.

```
yarn
yarn start:prod docs/input1.txt
```

## Project Design

### Dependencies

- <b>TypeScript</b>.
- <b>Jest</b>.
- <b>ESLint, Prettier</b> - It significantly increases the quality and readability of the code.
- <b>Commitlint</b> - Conventional Commits.
- <b>Husky, Lint-Staged</b> - Increases the quality of commits by running the test, ESLint and Prettier.

### Patterns

- <b>TDD</b>.
- <b>Single Responsibility</b>.
- <b>Dependency Injection</b> - Mainly to make the components more testable.
