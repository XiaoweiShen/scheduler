import React from "react";
import classNames from "classnames";
import "styles/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const {name,avatar,selected,setInterviewer}=props;
  
  const InterviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  const InterviewerListItemImageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected&&avatar
  });


  return (
    <li
      onClick={setInterviewer}
      className={InterviewerListItemClass}
      
    >
      <img
        className={InterviewerListItemImageClass}
        src={avatar}
        alt={name}
        data-testid = "interviewer"
      />
      {selected&&name}
    </li>
  );
}
