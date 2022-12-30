import React,{Fragment} from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
   const {id,time,interview,interviewers,bookinterview} = props;
   const {
    EMPTY,
    SHOW,
    CREATE,
    // SAVING,
    // COMFIRM,
    // EDIT,
    // ERRORONDEL,
    // ERRORONSAVE,
    // DELETING
  }
    = {
      EMPTY:"EMPTY",
      SHOW:"SHOW",
      CREATE:"CREATE",
      SAVING:"SAVING",
      COMFIRM:"CONFIRM",
      EDIT:"EDIT",
      ERRORONSAVE:"ERRORONSAVE",
      ERRORONDEL:"ERRORONDEL",
      DELETING:"DELETING"
    };
      
   const {mode, transition,back}= useVisualMode(
    interview ? SHOW : EMPTY
   );

  function save(name,interviewer){
    const interview ={
      student:name,
      interviewer:interviewer
    };
    //transition(SAVING);
    bookinterview(id,interview)
    // transition(SHOW);
    .then(()=>transition(SHOW));
    //.catch(()=>{transition(ERRORONSAVE)})
  }
  

  const onAdd = ()=>transition(CREATE);
  const onCancel = ()=>back();
  return (
    <Fragment>
      <article className="appointment">
        <Header time={time} />
          {mode === EMPTY&&<Empty onAdd={onAdd}></Empty>}
          {mode === SHOW&&<Show interview = {interview}></Show>}          
          {mode === CREATE&& <Form
            interviewers={interviewers}
            onCancel={onCancel}
            onSave={save}  
          />   
          }
      </article> 
    </Fragment>
   
  );
}
