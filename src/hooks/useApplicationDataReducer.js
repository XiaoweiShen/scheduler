import { useEffect, useReducer } from "react";
import "styles/Application.scss";
import axios from "axios";
import { getDayForAppointment, eqinterview } from "helper/selectors";

const ACTIONS = {
  SETDAY: "SETDAY",
  SETSTATE: "SETSTATE",
  SETINTERVIEW: "SETINTERVIEW",
  SETDAYSPOTS: "SETDAYSPOTS",
  REFRESH: "SET_INTERVIEW",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SETDAY: {
      const res = { ...state, day: action.day };
      return res;
    }
    case ACTIONS.SETSTATE: {
      return { ...state, ...action.data };
    }
    case ACTIONS.SETINTERVIEW: {
      const { id, appointment } = action;
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      return { ...state, appointments: appointments };
    }
    case ACTIONS.SETDAYSPOTS: {
      const { id } = action;
      const index = getDayForAppointment(state.days, id);
      const days = { ...state.days };
      days[index] = days[index] || null;
      days[index]["spots"] = days[index]["spots"] || null;
      days[index]["appointments"] = days[index]["appointments"] || null;
      if (days[index]["appointments"]) {
        const res = days[index]["appointments"].reduce((acc, cur) => {
          return (acc = state.appointments[cur].interview ? acc - 1 : acc);
        }, 5);
        days[index]["spots"] = res;
      }
      return { ...state, days: Object.values(days) };
    }
    case ACTIONS.REFRESH: {
  
      const { id, interview } = action;
      const flag = eqinterview(
        state.appointments[id]["interview"] || null,
        interview
      );
      if (flag) {
       
        const appointment = {
          ...state.appointments[id],
          interview: interview ? { ...interview } : null,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        
        return { ...state, appointments: appointments };
      }
      return { ...state };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData(props) {
  
  //local data structure-----------------------------------
  const [state, dispatch] = useReducer(reducer, {
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {},
  });

  //sever side data source ---------------------------------

  const setDay = (day) => dispatch({ type: ACTIONS.SETDAY, day: day });

  const setDaySpots = (id) => {
    dispatch({ type: ACTIONS.SETDAYSPOTS, id: id });
  };

  const setInterview = (id, interview) => {
    return new Promise((resolve, reject) => {
      const url = `/api/appointments/${id}`;
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      };
      (interview ? axios.put(url, appointment) : axios.delete(url))
          .then(() =>
            dispatch({
              type: ACTIONS.SETINTERVIEW,
              id: id,
              appointment: appointment,
            })
          )
          .then(() => setDaySpots(id))
          .then(() => resolve("success!"))
          .catch((error) => reject(error.message));
    });
  };

  useEffect(() => {
    const serverSocket = new WebSocket("ws://localhost:8001");
    serverSocket.onopen = (event) => {
      serverSocket.send("ping");
      serverSocket.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        if (data.type === ACTIONS.REFRESH) {
          const { id, interview } = data;
          dispatch({ type: ACTIONS.REFRESH, id: id, interview: interview });
          setDaySpots(id);
        }
      });
    };
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: ACTIONS.SETSTATE,
        data: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  //     days[index]["spots"] += op;

  // const setInterview = (id, interview, fromServer = false) => {
  //   return new Promise((resolve, reject) => {
  //     const op = interview ? -1 : 1;
  //     const url = `/api/appointments/${id}`;
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: interview ? { ...interview } : null,
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment,
  //     };
  //     const index = getDayForAppointment(state.days, id);

  //     const days = { ...state.days };
  //     days[index] = days[index] || null;
  //     days[index]["spots"] = days[index]["spots"] || null;
  //     days[index]["spots"] += op;

  //     if (fromServer === false) {
  //       (interview ? axios.put(url, appointment) : axios.delete(url))
  //         .then(() =>
  //           dispatch({
  //             type: ACTIONS.SETINTERVIEW,
  //             data: {
  //               appointments: appointments,
  //               days: Object.values(days),
  //             },
  //           })
  //         )
  //         .then(() => resolve("success!"))
  //         .catch((error) => reject(error.message));
  //     } else {
  //           dispatch({
  //             type: ACTIONS.SETINTERVIEW,
  //             data: {
  //               appointments: appointments,
  //               days: Object.values(days),
  //             },
  //           });

  //     }

  //     }
  //   );
  // };
  return { state, setDay, setInterview };
}
