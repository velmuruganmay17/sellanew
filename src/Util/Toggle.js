import React,{Component} from 'react';
import apiCall from '../services/apicall';
class Toggle extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,  
    }; 
    
    this.handleChange = this.handleChange.bind(this);
    
  }
  handleChange() {
    var	handleToUpdateStatus	=	this.props.handleToUpdateStatus;
    this.setState({ isChecked: !this.state.isChecked }); 
    console.log("user >> "+this.props.userdata._id.$oid);
    const body = { 
      "_id": {"$oid":this.props.userdata._id.$oid},
      active: !this.state.isChecked,
    };
    apiCall(`updateUserStatus`, 'POST', body)
    .then(data => {
      console.log(data);
        if(data.response == 'OK') {
          alert(`Status updated successfully for ${this.props.userdata.gbsId} `);
          // let filteredArray = this.state.users.filter(this.props.users=> {users._id.$oid !== user._id.$oid});
          handleToUpdateStatus(this.props.userdata);
        } 
    })
    .catch(error => {
        this.setState({ hasError: true });
        console.error(error);
    });
  }
  render () {
    console.log(this.props.isChecked);
    return ( 
      <label className="switch">
        <input type="checkbox" value={this.props.isChecked} onChange={this.handleChange} />
        <div className="slider"></div>
      </label>
    );
  }
}  
export default Toggle;