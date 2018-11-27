import React,{Component} from 'react';
import { Alert } from 'reactstrap';
import '../../css/Headers.css';
import { Container, Row, Col } from 'reactstrap';
class Header extends Component{ 
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
            <div>
              <Row> 
                  <Col>
                    <Alert style={{"float":"right"}} color="light">
                        Dipin Krishnan
                        <img src={require("../../img/user.png")} className="img-width"/>
                    </Alert>
                    </Col>
                </Row>
          </div>    
        )    
} 
}

export default Header;