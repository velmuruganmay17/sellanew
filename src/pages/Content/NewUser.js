import React,{Component} from 'react';
import PostInputField from './components/PostInputField';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import uuidv4 from 'uuid/v4';
import apiCall from '../../services/apicall';

export default class NewUser extends Component{

    constructor(){
        super();

        this.state = {
            gbsId : '',
            name : '',
            email : '',
            phone : '',
            password : '',
            role : '',
            rolevalue:'',
            hasError : '',
        };
        this.editGbsId = this.editGbsId.bind(this);
        this.editName = this.editName.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.editPhone = this.editPhone.bind(this);
        this.editPassword = this.editPassword.bind(this);
        this.editRole = this.editRole.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

        editGbsId(event){
            this.setState({gbsId : event.target.value});
        }

        editName(event){
            this.setState({name : event.target.value});
        }

        editEmail(event){
            this.setState({email : event.target.value});
        }

        editPhone(event){
            this.setState({phone : event.target.value});
        }

        editRole = (e) => {
            let target = e.target
            let value = Array.from(target.selectedOptions, option => option.value);
            console.log(" role : "+value+" rolevalue : "+this.state.rolevalue)
            this.setState({
                rolevalue: value,
                role:value
            });
          }

        editPassword(event){
            this.setState({password : event.target.value});
        }

        handleClick(){
            if(this.state.gbsId && this.state.name && this.state.password) {
              //  this.setState({loading: true});
                console.log("role ::: "+this.state.role)
                const isActive = "true";
                const body = {
                  gbsId: this.state.gbsId.toUpperCase(),
                  name: this.state.name,
                  password: this.state.password,
                  email: this.state.email,
                  phone: this.state.phone,
                  role: this.state.role,
                  active: isActive,
                };
          
                apiCall(`insertUser`, 'POST', body)
                .then(users => {
                    if(users.response === 'OK') {
                        var first = users.responseData[0];
                        console.log(first,first.name);
                        this.props.handleToUpdate(first);
                        this.setState({
                            gbsId: '',
                            name: '',
                            password: '',
                            email: '',
                            phone: '',
                            role: '',
                            active: '',
                        });
                    }
                })
                .catch(error => {
                  this.setState({hasError: true});
                  console.error(error);
                });
                this.props.closeModal();
              } else {
                alert('Please Fill in all the fields');
              }
        }

        render(){
            return(
                <div>
                    <h4>Create a new Sella Cast User</h4>

                    <PostInputField
                        type={'text'}
                        className={'gbsId-input'}
                        id={'gbsId'}
                        title={'GBS CODE'}
                        value={this.state.gbsId}
                        onChange={this.editGbsId}
                        />

                    <PostInputField
                        type={'text'}
                        className={'name-input'}
                        id={'name'}
                        title={'NAME'}
                        value={this.state.name}
                        onChange={this.editName}
                         />

                    <PostInputField
                        type={'text'}
                        className={'email-input'}
                        id={'email'}
                        title={'EMAIL'}
                        value={this.state.email}
                        onChange={this.editEmail}
                         />

                    <PostInputField
                        type={'text'}
                        className={'phone-input'}
                        id={'phone'}
                        title={'PHONE'}
                        value={this.state.phone}
                        onChange={this.editPhone}
                         />

                    <PostInputField 
                        type={'password'}
                        className={'password-input'}
                        id={'password'}
                        title={'PASSWORD'}
                        value={this.state.password}
                        onChange={this.editPassword}
                         />

                    <FormGroup>
                    <Label for="role">ROLE</Label>
                    <Input type="select" name="role" id="role" onChange={(e) => this.setState({ role: e.target.value })} value={this.state.role} >
                        <option value="">Select</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Publisher">Publisher</option>
                    </Input>
                    </FormGroup>
                    <Button color="primary" onClick={this.handleClick}>Add</Button>
                </div>
            )
        }

}