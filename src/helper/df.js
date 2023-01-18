// test("getInterviewersForDay returns an array", () => {
//   const result = getInterviewersForDay(state, "Monday");
//   expect(Array.isArray(result)).toBe(true);
// });

// test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
//   const result = getInterviewersForDay(state, "Monday");
//   expect(result.length).toEqual(4);
// });

// test("getInterviewersForDay returns an array containing the correct interviewers ", () => {
//   const [first, second,third,forth] = getInterviewersForDay(state, "Tuesday");
//   expect(first).toEqual(1);
//   expect(second).toEqual(2);
//   expect(third).toEqual(3);
//   expect(forth).toEqual(4);

// });

// test("getInterviewersForDay returns an empty array when the days data is empty", () => {
//   const result = getInterviewersForDay({ days: [] }, "Monday");
//   expect(result.length).toEqual(0);
// });

// test("getInterviewersForDay returns an empty array when the day is not found", () => {
//   const result = getInterviewersForDay(state, "Wednesday");
//   expect(result.length).toEqual(0);
// });

const days = [{"id":1,"name":"Monday","appointments":[1,2,3,4,5],"interviewers":[2,3,6,8,10],"spots":2},{"id":2,"name":"Tuesday","appointments":[6,7,8,9,10],"interviewers":[1,2,4,5,8],"spots":2},{"id":3,"name":"Wednesday","appointments":[11,12,13,14,15],"interviewers":[1,2,6,8,10],"spots":2},{"id":4,"name":"Thursday","appointments":[16,17,18,19,20],"interviewers":[3,4,7,9,10],"spots":3},{"id":5,"name":"Friday","appointments":[21,22,23,24,25],"interviewers":[1,2,3,5,10],"spots":2}];

function getDayForAppointment(days, appointmentId) {
  return days.reduce((acc,cur,idx)=>{
    console.log(cur.appointments,appointmentId,cur.appointments.includes(appointmentId));
    acc = (cur.appointments.includes(appointmentId))?idx:acc;
    return acc;
  },"")
}

console.log(getDayForAppointment(days,2));


const obj = {
  id:1,
  interview:
    {
      interviewer:3,
      student:"dddd"
    }
  };

  console.log(Object.values(obj));

// const aaa = days.reduce((acc,cur,idx)=>{
//   let aa = cur.name;
//   acc[aa] = idx;
//   return acc},{})
// //console.log(res);
// console.log(aaa);

// let da = [];
// da=[...days,days[0]={...days[0],spots:20}];
// console.log(days[0]);


// function reducer(state, action) {
//   if (action.type === "add") {
//     return state + action.value;
//   }
//   if (action.type === "subtract") {
//     return state - action.value;
//   }

//   return state;
// }

// function BoringCalculator() {
//   const [state, dispatch] = useReducer(reducer, 0);

//   return (
//     <div>
//       <button onClick={() => dispatch({ type: "add", value: 3 })}>Add 3</button>
//       <button onClick={() => dispatch({ type: "subtract", value: 5 })}> Subtract 5</button>
//       <button onClick={() => dispatch({ type: "add", value: 7 })}>Add 7</button>
//       <h2>{state}</h2>
//     </div>
//   );
// }

// const bookInterview = (id, interview) => {
  //   return new Promise((resolve, reject) => {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview },
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment,
  //     };
  //     const index = dayIndex[state.day]*1;
  //     state.days[index]={...state.days[index],spots:state.days[index].spots-1};
       
  //     axios
  //       .put(`/api/appointments/${id}`, appointment)
  //       .then(() => setState({ ...state, appointments,days:state.days}))
  //       .then(() => resolve("success!"))
  //       .catch((error) => reject(error.message));
  //   });
  // };

  // const cancelInterview = (id)=> {
  //   return new Promise((resolve,reject)=>{
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: null,
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment,
  //     };

  //     const index = dayIndex[state.day]*1;
  //     state.days[index]={...state.days[index],spots:state.days[index].spots+1};
      
  //     axios
  //       .delete(`/api/appointments/${id}`)
  //       .then(() => setState({ ...state, appointments,days:state.days}))
  //       .then(() => resolve("success!"))
  //       .catch((error) => reject(error.message));
  //   })
  // }