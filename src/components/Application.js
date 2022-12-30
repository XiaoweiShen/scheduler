import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "styles/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
//import useVisualMode from "hooks/useVisualMode";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helper/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });


  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
       }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    return new Promise((resolve,reject)=>{
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      axios.put(`/api/appointments/${id}`,appointment)
      .then(()=>{setState({...state,appointments})})
      .then(()=>resolve("success!"))
      .catch((error)=>reject(error))
    });
  }

  // get appointments
  const appointments_array = getAppointmentsForDay(state, state.day);
  const interviewers_array = getInterviewersForDay(state, state.day);
  // map appointment_array to JSX elements
  const schedule = appointments_array.map((appointment) => {
    // check if appointment is null as the first render is an empty array
    if (appointment) {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers_array}
          bookinterview={bookInterview}
        />
      );
    } else return null;
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
        <Appointment
          key="last"
          time="5pm"
          interviewers={interviewers_array}
        ></Appointment>
      </section>
    </main>
  );
}
