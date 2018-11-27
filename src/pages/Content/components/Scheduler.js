import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Scheduler = (props) => {
    return(<div className={`form-group ${props.className}`}>
    <label htmlFor={props.id}>{props.title}</label><br/>
    <DatePicker selected ={props.value} onChange ={props.onChange}/>
  </div>);
}

export default Scheduler;