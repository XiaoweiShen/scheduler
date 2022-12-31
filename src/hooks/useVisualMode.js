 import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history,setHistory]=useState([initial]);
  
  const transition = ((newmode,replace=false)=>{
    if(replace){
      setHistory(prev=>prev.slice(0,-1));
      setHistory(prev => ([...prev, newmode]));
     // console.log("rep=",history,"mode=",mode);
      setMode(newmode);
    }
    else{
      setHistory(prev => ([...prev, newmode]));
    //  console.log("no rep=",history,"mode=",mode);
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
    else 
    {
      setMode(history[0]);
    }
  })
  return {mode,transition,back,history };
}

