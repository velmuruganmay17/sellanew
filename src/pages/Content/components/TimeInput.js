import React from 'react';

const TimeInput = (props) => {

    return(<div className={`form-group ${props.className}`}>
    <label htmlFor={props.id}>{props.title}</label>
    <input type="text" pattern="[0-9]*" className="form-control" id={props.id} value={props.value} onChange={props.onChange}/>
    <span style={{color: "red"}}>{props.error}</span>
  </div>);
}

export default TimeInput;