import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const TextArea = (props) => {

    return(<div className={`form-group ${props.className}`}>
    <Label htmlFor={props.id}>{props.title}</Label>
    <textarea className="form-control" id={props.id} value={props.value} onChange={props.onChange}/>
    <span style={{color: "red"}}>{props.error}</span>
  </div>);
}

export default TextArea;