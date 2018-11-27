import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/Toggle.css';
import './css/Users.css';
import Header from './pages/Header/Header';
import { Container, Row, Col } from 'reactstrap';
import SideBar from './pages/SideBar/SideBar';
import Home from './pages/Content/Home';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import UserProfile from './Util/UserProfile';
import Login from './pages/Content/Login';

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super(); 
  }

  componentDidMount() {
    // if(this.props.location.pathname === '/') {
    //   this.props.history.replace('/Dashboard');
    // }
    if(UserProfile.checkSessionAvailable()) {
      console.log('session available ');
    } else {
      this.props.history.replace('/');
    }
  }

  render() {
    let isSessionExist = UserProfile.checkSessionAvailable();
    let srcpath = require("./img/backgnd1.jpg");
    return (
      <div className="full-width">
        {/* <Row>
           <Col><Header /> </Col>
        </Row> */}
        <Row>
           
           {
              isSessionExist? 
              <Col xs="12" sm="2" md="2" lg="2" >
              <SideBar /> 
              </Col>  
              : 
              <Col xs="6" sm="0" md="6" lg="6" style={{"height":"50vw","background":`url('${srcpath}')`}} >
                
              </Col> 
           } 
           {
              isSessionExist?
            <Col xs="12" sm="10" md="10" lg="10" >
                  <Row>
                      <Col><Header /> </Col>
                  </Row>
                  <Row style={{"padding":"20px"}}>
                    <Home /> 
                  </Row>
             </Col>
            : 
            <Col xs="6" sm="8" md="6" lg="6" >
              <Row style={{"padding":"20px"}}>
                <Login /> 
              </Row>
            </Col>
           }

         
           
        </Row>
        </div>
    );
  }
}

export default withRouter(App);
