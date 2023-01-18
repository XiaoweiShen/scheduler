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

export function getDayForAppointment(days, appointmentId) {
  return days.reduce((acc, cur, idx) => {
    acc = cur.appointments.includes(appointmentId) ? idx : acc;
    return acc;
  }, "");
}

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
