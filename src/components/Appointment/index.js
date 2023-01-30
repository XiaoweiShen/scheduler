import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, setinterview } = props;
  // define modes--------------------------------
    const EMPTY= "EMPTY";
    const SHOW= "SHOW";
    const CREATE= "CREATE";
    const SAVING= "SAVING";
    const CONFIRM= "CONFIRM";
    const EDIT= "EDIT";
    const ERRORONSAVE= "ERRORONSAVE";
    const ERRORONDEL= "ERRORONDEL";
    const DELETING= "DELETING";
  //--------------------------------------------- 

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    setinterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERRORONSAVE);
      });
  }

  function onDelete() {
    transition(DELETING, true);
    setinterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => transition(ERRORONDEL, true));
  }

  const onAdd = (e) => transition(CREATE);

//this mode update part is for websocket, when receive a SET_INTERVIEW message and update the state, the display also need refresh by ckeck mode and interview

  if (mode === SHOW && !interview) transition(EMPTY);
  if (mode === EMPTY && interview) transition(SHOW);

//---------------------------------------------------------------------------

  return (
    <Fragment>
      <article className="appointment" data-testid="appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={onAdd}></Empty>}
        {mode === SHOW && (
          <Show
            interview={interview}
            onDelete={(e) => transition(CONFIRM)}
            onEdit={(e) => transition(EDIT)}
          ></Show>
        )}
        {mode === CREATE && (
          <Form interviewers={interviewers} onCancel={back} onSave={save} />
        )}
        {mode === EDIT && (
          <Form
            interviewers={interviewers}
            interview={interview}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={"Saving"}></Status>}
        {mode === DELETING && <Status message={"Deleting"}></Status>}
        {mode === ERRORONDEL && (
          <Error message={"Can not cancel the interview"} onClose={back} />
        )}
        {mode === ERRORONSAVE && (
          <Error message={"Can not create the interview"} onClose={back} />
        )}
        {mode === CONFIRM && (
          <Confirm
            message={"Confirm to delete?"}
            onConfirm={onDelete}
            onCancel={back}
          ></Confirm>
        )}
      </article>
    </Fragment>
  );
}
