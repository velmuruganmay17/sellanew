import React from 'react';
import { Button} from 'reactstrap';

const AddButton = (props) => {
    return(<Button color="primary" onClick= {props.onClick}>Add</Button>);
}
export default AddButton;


