import React,{useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form({interviewer,interviewers,onSave,onCancel}) {
  
  const [Student,setStudent]=useState("");
  const [Interviewer,setInterviewer]=useState(interviewer||null);

  const reset = ()=>{
    setStudent('');
    setInterviewer(null);
  }

  const cancel =()=>{
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={(e)=>{e.preventDefault();}}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(e)=>setStudent(e.target.value)}
        value = {Student}
      />
    </form>
    <InterviewerList 
      interviewers={interviewers}
      value={Interviewer}
      onChange={(e)=>setInterviewer(e.target.value)}      
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={(e)=>cancel()}>Cancel</Button>
      <Button confirm onClick={onSave}>Save</Button>
    </section>
  </section>
</main>
    
    
    
    );
}
