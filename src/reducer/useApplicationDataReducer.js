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
    
    /**setdayspots: once there is a operate to an appointment, find out the day of the appointment, check the amount of appointments and update the num of spots */
    case ACTIONS.SETDAYSPOTS: {
      const { id } = action;
      const index = getDayForAppointment(state.days, id);
      const days = { ...state.days };
      days[index] = days[index] || null;
      const spotsOfDay = days[index]["appointments"].length;
      days[index]["spots"] = days[index]["spots"] || null;
      days[index]["appointments"] = days[index]["appointments"] || null;
      if (days[index]["appointments"]) {
        const res = days[index]["appointments"].reduce((acc, cur) => {
          return (acc = state.appointments[cur].interview ? acc - 1 : acc);
        }, spotsOfDay);
        days[index]["spots"] = res;
      }
      return { ...state, days: Object.values(days) };
    }
    
    /**Use in websocket part, when local end recieve a message of SET_INTERVIEW , compare the recieved interview data with local one, to check if the message is init by local end or from others.
    if interview data is same, do nothing, if it is different,update state data per message**/ 
    
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

export default function useApplicationDataReducer(props) {
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
        .then(() =>{
          dispatch({
            type: ACTIONS.SETINTERVIEW,
            id: id,
            appointment: appointment,
          })
        }
      )
        .then(() => setDaySpots(id))
        .then(() => resolve("success!"))
        .catch((err) => reject(err));
    });
  };

  // init websocket , only run once, add listener of message and catch the msg of SET_INTERVIEW and update state data accordingly.
   
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

  return { state, setDay, setInterview };
}
