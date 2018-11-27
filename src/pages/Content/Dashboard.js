import React,{Component} from 'react';
import {  Row, Col } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardSubtitle, Button } from 'reactstrap';
import { Badge } from 'reactstrap';    
import {  Alert,Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import apiCall from '../../services/apicall';

let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

class Dashboard extends Component{ 
     constructor() {
        super();  
        this.state = {
            modal : false,
          applicationName : "Sella Cast",
          contentfeeds : [],
          searchContentfeeds : [],
          contentfeeding : {},
          image:"",
          categories:"",
          headline:"",
          description:"",
          currentPage: 1,
          dataPerPage: 12,
          searchedData: '',
          cardStyle : {"max-height":"200px","overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis",},

        };
        this.toggle = this.toggle.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
      }
       
      toggle() {
        this.setState({
          modal: !this.state.modal
        });   
      }
      handleModal(index) {
        console.log("index >> "+index);
        this.toggle();
        if(!this.state.modal) { 
            console.log("this.modal >> "+this.modal);
            this.setState({
                image: this.state.contentfeeds[index].image,
                categories:this.state.contentfeeds[index].categories,
                headline:this.state.contentfeeds[index].headline,
                description:this.state.contentfeeds[index].description,
              });  
              console.log("this.modal >> "+this.state.image);
              console.log("this.categories >> "+this.state.categories);
              console.log("this.headline >> "+this.state.headline);
              console.log("this.description >> "+this.state.description);
              
        } 
      }

      componentWillMount() {
          debugger;
        const body = { 
            filename: 'feeder', 
          };

            apiCall(`fetchAliveFeeds`)
            .then(contentfeeds => {
                console.log(contentfeeds);
                this.setState({ contentfeeds }); 
            })
            .catch(error => {
                this.setState({ hasError: true });
                console.error(error);
            });
    }

    
    handleClick(event) {
        event.preventDefault();
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
  
      handleLastClick(event) {
        event.preventDefault();
        this.setState({
          currentPage:last
        });
      }

      handleFirstClick(event) {
        event.preventDefault();
        this.setState({
          currentPage:1
        });
    }

    render() {
        let { contentfeeds, currentPage, dataPerPage,searchContentfeeds } = this.state;
        // Logic for displaying current todos
        let indexOfLastTodo = currentPage * dataPerPage;
        let indexOfFirstTodo = indexOfLastTodo - dataPerPage;
        let currentFeeds = (searchContentfeeds.length >0 ? searchContentfeeds : contentfeeds).slice(indexOfFirstTodo, indexOfLastTodo);
        prev  = currentPage > 0 ? (currentPage -1) :0;
        last = Math.ceil((searchContentfeeds.length >0 ? searchContentfeeds : contentfeeds).length/dataPerPage);
        next  = (last === currentPage) ?currentPage: currentPage +1;
        let paginationInfo=`Showing ${indexOfFirstTodo+1} to ${(indexOfLastTodo>contentfeeds.length)?contentfeeds.length:indexOfLastTodo} of ${contentfeeds.length} entries`;

        // Logic for displaying page numbers
        let pageNumbers = [];
        for (let i = 1; i <=last; i++) {
        pageNumbers.push(i);
        }
        return ( 
            <div>
            <Row>
            <Col>
                <Row> 
                        <Col>
                            <h5><Badge color="secondary">DASHBOARD</Badge></h5>
                        </Col>
                </Row>

                <Row style={{"margin-bottom":"10px"}} > 
                        <Col>
                            <h5><Badge color="secondary">Casting Now</Badge></h5>
                        </Col> 
                        <Col>
                            <Button  style={{"float":"right"}} color="primary"> Refersh Stations</Button>
                        </Col>
                </Row> 
                <Row className="justify-content-center" > 
                    {
                    currentFeeds.map((contentfeed, index) => 
                    <Col key={indexOfFirstTodo+index} xs="5" sm="4" md="3" lg="3" xl="3"
                    style={{ margin: "0 10px 10px 0",
                    border: "1px solid gray", borderRadius: "10px" }} > 
                        <Card  style={{ border: "1px solid white" }} > 
                            <CardBody>
                            <CardSubtitle>{contentfeed.headline}</CardSubtitle>
                             <CardText style = {{ "min-height":"200px","max-height": "200px",overflow: "hidden"}}>{contentfeed.description}</CardText>
                            <Button onClick={() => this.handleModal(indexOfFirstTodo+index)} >View</Button>
                            </CardBody>
                        </Card>
                    </Col> 
                    )
                    }  
                </Row>
                <Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.state.categories}</ModalHeader>
                    <ModalBody>
                            <Row>
                            <Col> 
                                {  (this.state.image!== '')?  
                                    <CardImg  top style={{ "min-height":"100px","max-height":"100px","max-width":"95%",overflow: "hidden" }} src={`${this.state.image}`}   />
                                : '' }
                            </Col> 
                            </Row>
                            <Row>
                                <Col> {this.state.headline}
                                </Col> 
                            </Row>
                            <Row>
                                <Col> {this.state.description}
                                </Col> 
                            </Row> 
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                    </Modal>
                </Row>
            </Col> 
            </Row>
            <Row>
                <Col>
                    <Alert color="light">
                        {paginationInfo}
                    </Alert>
                </Col>
                <Col>
                        <nav>
                            <Pagination style={{"float":"right"}}>
                            <PaginationItem>
                            { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                                <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                            }
                            </PaginationItem>
                            <PaginationItem>
                            { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                                <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                            }
                            </PaginationItem> 
                            <PaginationItem>
                            {
                                currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                                <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                            }
                            </PaginationItem>

                            <PaginationItem>
                            {
                                currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                                <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                            }
                            </PaginationItem>
                            </Pagination>
                            </nav>
                </Col>
            </Row>
            </div>
        )    
} 
}

export default Dashboard;