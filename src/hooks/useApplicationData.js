import { useState, useEffect } from "react";
import "styles/Application.scss";
import axios from "axios";

export default function useApplicationData(props) {
  //local data structure-----------------------------------
  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });
  //sever side data source ---------------------------------
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
  //day related functions-------------------------------
  const setDay = (day) => setState({ ...state, day });
  const dayIdx = (days) => {
    const index = days.reduce((acc, cur, idx) => {
      let aa = cur.name;
      acc[aa] = idx;
      return acc;
    }, {});
    return index;
  };

  const dayIndex = dayIdx(state.days);

  //local fuction include book and cancel interview;

  const setInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      const op = interview ? 1 : -1;
      const url = `/api/appointments/${id}`;
      //const svrop = interview?axios.put(url,appointment):axios.delete(url)
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const index = dayIndex[state.day] * 1;
      state.days[index] = {
        ...state.days[index],
        spots: state.days[index].spots + op,
      };

      (interview ? axios.put(url, appointment) : axios.delete(url))
        .then(() => setState({ ...state, appointments, days: state.days }))
        .then(() => resolve("success!"))
        .catch((error) => reject(error.message));
    });
  };

  return { state, setDay, setInterview};
}
