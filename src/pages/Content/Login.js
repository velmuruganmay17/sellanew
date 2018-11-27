import React,{Component} from 'react';
import UserProfile from '../../Util/UserProfile';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component{ 
    constructor() {
        super();  
        this.state = {
          userName:'',
          password:''
        }; 
      }
      render() {
        let isSessionExist = UserProfile.checkSessionAvailable();
       
        return (
            <div  >
                <Form>
                    <FormGroup>
                        <Label for="userName">User Name</Label>
                        <Input type="userName" name="userName" id="userName" placeholder="User Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userName">User Name</Label>
                        <Input type="userName" name="userName" id="userName" placeholder="User Name" />
                    </FormGroup>
                    <Button color="primary">Login</Button>
                </Form>
            </div>
        )
    }
}
export default Login;