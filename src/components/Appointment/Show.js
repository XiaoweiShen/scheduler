import React from "react";
import InterviewerListItem from "components/InterviewerListItem";

export default function Show({interview,onEdit,onDelete}) {
  let student = '';
  let interviewer ={};
  if (interview) {student=interview.student;interviewer=interview.interviewer;}
  return (
<main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">{student}</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <InterviewerListItem
        {...interviewer}
        selected={true}
      >
      </InterviewerListItem>
    {/* <h3 className="text--regular">{interviewer.name}</h3> */}
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onClick={onEdit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onClick={onDelete}
      />
    </section>
  </section>
</main>
  )
}