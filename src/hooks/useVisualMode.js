 import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history,setHistory]=useState([initial]);
  

  const transition = ((newmode,replace=false)=>{
    if(replace){
      setMode(newmode);  
      let repHistory =[...history];
      repHistory[repHistory.length - 1] = newmode;
      setHistory(repHistory);
      }
    else{
      setMode(newmode);
      let addHistory=[...history];
      addHistory.push(newmode);
      setHistory(addHistory);
    }
  })
  const back = (()=>{
    let backHistory = [...history];
    if(backHistory.length>1)
    {
      backHistory.pop();
      setHistory(backHistory);
      setMode(backHistory[backHistory.length-1]);
    }
    else 
    {
      setMode(backHistory[0]);
    }
  })
  return {mode,transition,back,history };
}

