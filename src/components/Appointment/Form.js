import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form({
  id,
  interview,
  interviewers,
  onSave,
  onCancel,
}) {
  const { student, interviewer } = interview
    ? interview
    : { student: undefined, interviewer: undefined };
  const [Student, setStudent] = useState(student || "");
  const [Interviewer, setInterviewer] = useState(
    interviewer ? interviewer.id : null
  );
  const [errcode, setErrCode] = useState("");
  //console.log("interviewer", Interviewer);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = (student, interviewer) => {
    if (!student) return setErrCode("Student name cannot be blank");
    if (!interviewer) return setErrCode("Please select an interviewer");
    setErrCode("");
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            onChange={(e) => {
              setStudent(e.target.value);
              setErrCode("");
            }}
            value={Student}
          />
          <p className="appointment__card-left-validate">{errcode}</p>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={Interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(e) => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={(e) => validate(Student, Interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
