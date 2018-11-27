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
import SideMenu from '../Content/SideMenu';
import AddBackgroundImage from '../Content/components/AddBackgroundImage';

class SideBar extends Component{ 
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
        let isSessionExist = UserProfile.checkSessionAvailable();
        return (
            <div className="padding-div-left">
                
                 
            </div>
        )    
} 
}

export default SideBar;