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

export function getInterviewersForDay(state, day){
  const selector = state.days.filter((item) => item.name === day);
  
  let result =
    selector.length > 0&&selector[0].interviewers
      ? selector[0].interviewers.reduce((acc, value) => {
          return (acc = [...acc, state.interviewers[value]]);
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

