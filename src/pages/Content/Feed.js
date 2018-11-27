import React,{Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../css/Feed.css';
import '../../css/Padding.css';
import { InputGroup, InputGroupAddon, InputGroupText,Input } from 'reactstrap';
import { Table } from 'reactstrap';
import apiCall from '../../services/apicall';
import NewFeed from './NewFeed';
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink  } from 'reactstrap';

let prev  = 0;
let next  = 0;
let last  = 0;
let first = 0;

const STYLE = {
    contentTH: {
        width: '50%',
    },
    scheduledTH: {
        width: '20%',
    },
    rTimeTH: {
        width: '5%'
    },
    channelTH: {
        width: '10%'
    },
    publishTH: {
        width: '10%'
    },
    deleteTH: {
        width: '5%'
    }
};

class Feed extends Component{ 
     constructor() {
        super();  
        this.state = {
          feeds:[],
          searchFeed:[],
          hasError: false,
          modal : false,
          currentPage: 1,
          dataPerPage: 10,
          searchedData: '',
          feedId:""
        };
        this.toggle = this.toggle.bind(this);
        this.editEntries = this.editEntries.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLastClick = this.handleLastClick.bind(this);
        this.handleFirstClick = this.handleFirstClick.bind(this);
        this.editSearchedData = this.editSearchedData.bind(this);
        this.editFeedDetails = this.editFeedDetails.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
      }

      componentWillMount() {
        this.fetchAllFeeds();
    }

    fetchAllFeeds (){
        apiCall(`fetchAllFeeds`)
            .then(feeds => {
                this.setState({ feeds });
                console.log(feeds);
            })
            .catch(error => {
                this.setState({ hasError: true });
                console.error(error);
            });
    }

    toggle() {
        this.setState({
          modal: !this.state.modal,
          feedId:""
        });
      }

      editFeedDetails(e) {
        let feedId = e.currentTarget.id;
        console.log(e.currentTarget);
        console.log(this.state.feeds[0]._id.$oid);
        let currentFeed = {};
        currentFeed = this.state.feeds.find((feed) => feed._id.$oid ===e.currentTarget.id);
        this.setState({
            modal: !this.state.modal,
            feedId : currentFeed._id.$oid
        })
        console.log(this.state.headline);
      } 
    editEntries(event) {
        this.setState({
            dataPerPage: event.target.value
        });    
    }

    editSearchedData(event) { 		
       var updatedList = this.state.feeds;
       updatedList = updatedList.filter((item) => 
       item.headline.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      this.setState({searchFeed: updatedList});
    } 

    handleDelete(e){
        let selectedValue = e.currentTarget.attributes['id'].value
            const body = {
                _id: {$oid:selectedValue}
              };
                apiCall(`deleteFeed`, 'POST', body)
                .then(() => {
                    console.log(this.state.feeds.length);
                    let filteredArray = this.state.feeds.filter(item => item._id.$oid !== selectedValue)
                   this.setState({
                        feeds: filteredArray
                    });
                })
                .catch(error => {
                  this.setState({hasError: true});
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
    
    closeModal = () => {
        this.setState({ modal: false })
        this.fetchAllFeeds();
    }    

    render() {
    let { feeds, currentPage, dataPerPage,searchFeed } = this.state;

      // Logic for displaying current todos
      let indexOfLastTodo = currentPage * dataPerPage;
      let indexOfFirstTodo = indexOfLastTodo - dataPerPage;
      let currentFeed = (searchFeed.length >0 ? searchFeed : feeds).slice(indexOfFirstTodo, indexOfLastTodo);
       prev  = currentPage > 0 ? (currentPage -1) :0;
       last = Math.ceil((searchFeed.length >0 ? searchFeed : feeds).length/dataPerPage);
       next  = (last === currentPage) ?currentPage: currentPage +1;

      // Logic for displaying page numbers
      let pageNumbers = [];
      for (let i = 1; i <=last; i++) {
        pageNumbers.push(i);
      }
        return (
            <div className="padding-div-right full-width">
            <Row>
                <Col sm="3" md="3" lg="3" ><h5><Badge color="secondary">MANAGE CONTENTS</Badge></h5> </Col>
                <Col sm="7" md="7" lg="7" ></Col>
                <Col sm="2" md="2" lg="2" >
                <Button color="primary" onClick={this.toggle}>Create Feed</Button>{' '}
                </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>New Feed</ModalHeader>
            <ModalBody>
               <NewFeed closeModal={this.closeModal} feeds = {this.state.feeds} feedId= {this.state.feedId}/>
            </ModalBody>
            <ModalFooter>
                <Button color="light" onClick={this.toggle}>Close</Button>
            </ModalFooter>
            </Modal>
            <Row className="row-height"></Row>
            <Row>
                <Col lg="3">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Show</InputGroupAddon>
                        <Input value={this.state.dataPerPage} onChange={this.editEntries}  />
                        <InputGroupAddon addonType="append">entries</InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col lg="5"></Col>
                <Col lg="4">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Search:</InputGroupAddon>
                        <Input onChange={this.editSearchedData}  />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="table-height"></Row>
            <Row>
            <Table hover>
                <thead>
                <tr>
                    <th style={STYLE.contentTH}>CONTENT</th>
                    <th style={STYLE.scheduledTH}>SCHEDULED</th>
                    <th style={STYLE.rTimeTH}>RETENTION TIME</th>
                    <th style={STYLE.channelTH}>CHANNELS</th>
                    <th style={STYLE.publishTH}></th>
                    <th style={STYLE.deleteTH}></th>
                </tr>
                </thead>
                <tbody>
                    {
                    currentFeed.map((feed, index) =>
                        <tr>
                            <th scope="row">{feed.headline}</th>
                            <td>{feed.startdate} - {feed.enddate}</td>
                            <td>{feed.retentiontime}</td>
                            <td><h6><Badge color="success">PUBLIC</Badge></h6></td>
                            <td>
                            <img src={require("../../img/edit.png")} className="img-config" id={feed._id.$oid} onClick={this.editFeedDetails}/>
                            <img src={require("../../img/trash.png")} className="img-config"  id={feed._id.$oid}  onClick={this.handleDelete}/>
                                {/* <button id={feed._id.$oid} onClick={this.editFeedDetails}>edit</button> */}
                                </td>
                            <td></td>
                            <td></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            </Row>
            <Row>
                <Col>
                <nav>
           <Pagination>
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
export default Feed;