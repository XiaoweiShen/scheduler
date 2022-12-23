import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "styles/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((viewer) => (
          <InterviewerListItem
            name={viewer.name}
            avatar={viewer.avatar}
            selected={viewer.id === value }
            setInterviewer={(e)=>onChange(viewer.id)}
          >
          </InterviewerListItem>
        ))}
      </ul>
    </section>
  );
}
