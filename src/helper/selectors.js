
/** the function is used to get the appointment of a specified day,
    input value: the state data, the day selected
    logic: get the appointment id from state.days
           get each appointment data per id from state.appointments
    output: an array of appointments data of the day
**/

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

/** the function is used to get the interviewers array of a specified day,
    input value: the state data, the day selected
    logic: get the interviewers id from state.days
           get each interviewer data per id from state.interviews
    output: an array of interviewers data of the day
**/

export function getInterviewersForDay(state, day) {
  const selector = state.days.filter((item) => item.name === day);
  let result =
    selector.length > 0 && selector[0].interviewers
      ? selector[0].interviewers.reduce((acc, value) => {
          return (acc = [...acc, state.interviewers[value]]);
        }, [])
      : [];
  return result;
}

/** the state.spointments data only include interviewer id in the interview,the fuction is get the interviewer data and put the data into interview 
    input value: the state data, the interview selected
    logic: while the interview is not null
           get the interviewer data from state.interviews and append it into interview data
    output: an obj of interview data include the detailed interviewer data
**/

export function getInterview(state, interview) {
  let res = {};
  if (interview && interview.interviewer) {
    res = {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    };
    return res;
  } else return null;
}

//return the day of a given appointment id

export function getDayForAppointment(days, appointmentId) {
  return days.reduce((acc, cur, idx) => {
    acc = cur.appointments.includes(appointmentId) ? idx : acc;
    return acc;
  }, "");
}

/**the function used in websocket part, when local end recieve a message of SET_INTERVIEW , compare the recieved interview data with local one, to check if the message is init by local end or from others.
return a Boolean, if false, do nothing, if true,update state data per message**/ 

export function eqinterview(interview_state, interview_msg) {
  let flag = true;
  if (interview_msg !== null && interview_state !== null) {
    if (
      interview_msg.student === interview_state.student &&
      interview_msg.interviewer === interview_state.interviewer
    )
      flag = false;
  } else {
    if (interview_msg === null && interview_state === null) flag = false;
  }
  return flag;
}
