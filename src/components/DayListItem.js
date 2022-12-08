import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {
  
  const DayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots===0
  }); 

  const spotFlag = props.spots===1?'spot':'spots';
   

  return (
    <li onClick={()=>props.setDay(props.name)} className={DayListItemClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots===0?'no':props.spots} {spotFlag} remaining</h3>
    </li>
  );
}