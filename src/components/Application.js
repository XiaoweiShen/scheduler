import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helper/selectors";

//import useApplicationData from "hooks/useApplicationData"
import useApplicationDataReducer from "hooks/useApplicationDataReducer";

import "styles/Application.scss";

export default function Application(props) {
  //  const {state,setDay,setInterview} = useApplicationData();
  const { state, setDay, setInterview } = useApplicationDataReducer();
 
  const appointments_array = getAppointmentsForDay(state, state.day);

  const interviewers_array = getInterviewersForDay(state, state.day);

  const schedule = appointments_array.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers_array}
        setinterview={setInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"></Appointment>
      </section>
    </main>
  );
}
