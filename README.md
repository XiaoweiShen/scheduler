# Interview Scheduler
   Basically, the project is developing follow instuction, all dependancies and structure, directries, filename, and start method
   are as same as book.
## Project developing comments

1. finish all function requirement, include websocket and reducer;
   /src/hooks/useApplicationDataReducer  
      --------------for reducer and websocket;
   /src/hooks/useApplicationData         
      --------------for useState
   /src/components/Application.js     
      line 10/16 for useApplicationData
      line 11/17 for useApplicationDataReducer
      
2. integration test 
   /src/components/__test__/Application.test.js
      line 97-134: the error handling part need real axios , which can not run with previous test together, when need test these, need comment previous tests and import axios. 

## Project snapshot

!["Add and edit a appointment"](/doc/add_edit_appointment.jpg)

!["Deleting and Confirm"](/doc/delete_confirm.jpg)


