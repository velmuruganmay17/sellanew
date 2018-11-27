import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

const Select = (props) => {

    return(
        <div>
            <Label>Create new content feed to cast on TV</Label>
                <FormGroup>
                    <Input type="select" name="type" id="type" bsSize="sm" onChange = {props.onChange}>
                        <option>Team1</option>
                        <option>Team2</option>
                    </Input>
                </FormGroup>
        </div>);
}

export default Select;