 import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history,setHistory]=useState([initial]);
  
  const transition = ((newmode,replace=false)=>{
    if(replace){
      history.pop();
      setHistory([...history,newmode]);
      setMode(newmode);
    }
    else{
      setHistory([...history,newmode]);
      setMode(newmode);
    }
  })
  const back = (()=>{
    if(history.length>1)
    {
      history.pop();
      setHistory(history); 
      setMode(history[history.length-1]);
    }
  })
  return { mode,transition,back,history };
}

