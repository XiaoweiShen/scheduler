import React,{Fragment} from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



export default function Appointment(props) {
   const {time,interview} = props;
  //  const {student,interviewer}=props.interview;
   
   return (
    <Fragment>
      <article className="appointment">
        <Header time={time} />
          {
           interview?
            <Show student={interview.student} interviewer={interview.interviewer}></Show>                 
          :
            <Empty></Empty>
          }
      </article> 
    </Fragment>
   
  );
}
