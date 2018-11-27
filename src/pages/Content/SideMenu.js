import React,{Component} from 'react';
import {Alert,
    Collapse, 
    Nav,
    NavItem   } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import '../../css/Users.css';
import '../../css/Padding.css';

import { Container, Row, Col } from 'reactstrap';
import UserProfile from '../../Util/UserProfile'; 
import AddBackgroundImage from '../Content/components/AddBackgroundImage';

class SideMenu extends Component{ 
     constructor() {
        super();  
        this.state = {
          isOpen: false,
          applicationName : "Sella Cast", 
        };
        this.toggle = this.toggle.bind(this);
        
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() { 
        return (
            <div className="padding-div-left">
                <Alert color="light"> 
                        <img src={require("../../img/sellalogo.png")} className="log-img-width log-padding-img-top"/>
                </Alert>
                <Nav vertical>
                    <NavItem className="side-menu">
                        <NavLink to="/Dashboard">Dashboard</NavLink>
                    </NavItem> 
                    <NavItem className="side-menu">
                        <NavLink to="/Feed">Content Feed</NavLink>
                    </NavItem> 
                    <NavItem className="side-menu">
                        <NavLink to="/Users">Users</NavLink>
                    </NavItem>
                </Nav>  
            </div>
        )    
} 
}  
export default SideMenu;


