import React,{Fragment} from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
   const {id,time,interview,interviewers,bookInterview} = props;
   const {EMPTY,SHOW,CREATE}= {EMPTY:"EMPTY",SHOW:"SHOW",CREATE:"CREATE"};
      
   const {mode, transition,back}= useVisualMode(
    interview ? SHOW : EMPTY
   );

  // const saveInterview = (stuName,interviewer)=>{
  //   const interview ={
  //     Student:stuName,
  //     Interviewer:interviewer
  //   }
  //   bookInterview(id,interview);
  //   transition(SHOW);
  // }

  const onAdd = ()=>transition(CREATE);
  const onCancel = ()=>back();
  return (
    <Fragment>
      <article className="appointment">
        <Header time={time} />
          {mode === EMPTY&&<Empty onAdd={onAdd}></Empty>}
          {mode === SHOW&&<Show student={interview.student} interviewer={interview.interviewer}></Show>}          
          {mode === CREATE&& <Form
            interviewers={interviewers}
            onCancel={onCancel}
            //onSave={e=>saveInterview}  
          />   
          }
          
          {/* {
           interview?
            <Show student={interview.student} interviewer={interview.interviewer}></Show>                 
          :
            <Empty></Empty>
          } */}
      </article> 
    </Fragment>
   
  );
}
