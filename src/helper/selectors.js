export function getAppointmentsForDay(state, day) {
  const selector = state.days.filter((item) => item.name === day);

  let result =
    selector.length > 0
      ? selector[0].appointments.reduce((acc, value) => {
          return (acc = [...acc, state.appointments[value]]);
        }, [])
      : [];
  return result;
}

export function getInterview(state, interview) {
  let res ={};
  if(interview&&interview.interviewer)
   {      
     res = {...interview,interviewer:state.interviewers[interview.interviewer]};
     return res;
  }
  else return null;
};
// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
  
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };



// const result = getInterview(state, state.appointments["3"].interview);
// console.log("res=",result);
//module.exports = { getAppointmentsForDay };
