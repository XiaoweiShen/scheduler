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
  const { id, time, interview, interviewers, bookinterview, cancelinterview } =
    props;
  const {
    EMPTY,
    SHOW,
    CREATE,
    SAVING,
    CONFIRM,
    EDIT,
    ERRORONDEL,
    ERRORONSAVE,
    DELETING,
  } = {
    EMPTY: "EMPTY",
    SHOW: "SHOW",
    CREATE: "CREATE",
    SAVING: "SAVING",
    CONFIRM: "CONFIRM",
    EDIT: "EDIT",
    ERRORONSAVE: "ERRORONSAVE",
    ERRORONDEL: "ERRORONDEL",
    DELETING: "DELETING",
  };

  const { mode, history, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    bookinterview(id, interview)
      .then(() => {
        transition(SHOW);
        window.location.reload();
      })
      .catch(() => {
        transition(ERRORONSAVE, true);
      });
  }

  function onDelete() {
    transition(DELETING, true);
    cancelinterview(id)
      .then(() => {
        transition(EMPTY);
        window.location.reload();
      })
      .catch(() => transition(ERRORONDEL, true));
  }

  const onAdd = (e) => transition(CREATE);
  const onCancel = () => back();

  return (
    <Fragment>
      <article className="appointment">
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
          <Form interviewers={interviewers} onCancel={onCancel} onSave={save} />
        )}
        {mode === EDIT && (
          <Form
            interviewers={interviewers}
            interview={interview}
            onCancel={onCancel}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message={"Saving"}></Status>}
        {mode === DELETING && <Status message={"Deleting"}></Status>}
        {mode === ERRORONDEL && (
          <Error message={"Can not cancel the interview"} onClose={onCancel} />
        )}
        {mode === ERRORONSAVE && (
          <Error message={"Can not create the interview."} onClose={onCancel} />
        )}
        {mode === CONFIRM && (
          <Confirm
            message={"Confirm to delete?"}
            onConfirm={onDelete}
            onCancel={onCancel}
          ></Confirm>
        )}
      </article>
    </Fragment>
  );
}
