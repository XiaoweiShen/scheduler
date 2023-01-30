# Interview Scheduler
This Scheduler was built as part of course Completion for the Web Development BootCamp at Lighthouse Labs, We were provided the necessary tools and instructions to create a working schedular that required both a React Server and an API Server.

This Scheduler has been designed to allow appointments to be booked Mon-Fri between the hours of 12 pm -5pm. It is limmited to only allow one interview to be booked for time slot. Under the assumption that the Scheduler is booking the Use of a particular room. The scheduler is Dynamic as the selection of interviewers varies depending on the day to reflect their availablity. The database used for this Project was developed by Lighthouse Labs and uses PSQL .

The stretch practice : Reducer and Websocket is also introduce into the project. when interview data is updated , server will be triggered to send out message to all connected link to synchronize the status of all clients. 

## Dependencies 
   axios: "^1.2.1",
   classnames: "^2.2.6",
   normalize.css: "^8.0.1",
   react: "^16.9.0",
   react-dom: "^16.9.0",
   react-hooks-testing-library: "^0.6.0",
   react-test-renderer: "^16.9.0",
   react-scripts: "3.4.4",
   yarn: "^1.22.19"
 

## to start the application 

1. start the scheduler-api server:

/scheduler-api/npm start

2. start the scheduler application:

/scheduler/npm start

## all tests of Project 

The test part include: 
1. Manually test components in isolation: use Storybook,From the root directory of the project and type npm run storybook:

   npm run storybook

then open storybook at:
   
   http://localhost:9009/


2. Run integration tests from the command line: use Jest.
   npm test
    PASS  src/helper/selectors.test.js
    PASS  src/components/__tests__/DayListItem.test.js
    PASS  src/hooks/__tests__/useVisualMode.test.js
    PASS  src/components/__tests__/Button.test.js
    PASS  src/components/__tests__/Form.test.js
    PASS  src/components/__tests__/Application.test.js

3. Run automated end-to-end tests in the browser: use Cypress.
   -Test the script by running the npm run test:server command in the scheduler-api directory.
    npm run test:server
   -Run the webpack development server from the root of our Interview Scheduler client project.
    npm start
   -Run Cypress 
    npm run cypress

4. run  application in development mode: 
   -Test the script by running the npm run test:server command in the scheduler-api directory.
    npm run error
   -Run the webpack development server from the root of our Interview Scheduler client project.
    npm start
   -test error handling situation include add/edit/delete a interview.
  
5. Tips about integration test 
   /src/components/__test__/Application.test.js
      line 97-134: the error handling part need real axios , which can not run with previous test together, when need test these, need comment previous tests and import axios. 

## Project snapshot
1. Add and edit an appointment

!["Add and edit a appointment"](/doc/addinterview.jpg)

2. Deleting and Confirm an appointment

!["Deleting and Confirm"](/doc/edit_delete_confirm.jpg)


