import React,{Component} from 'react';
import InputField from '../components/InputField.js';
import TextArea from '../components/TextArea.js';
import Scheduler from '../components/Scheduler.js';
import FileUpload from '../components/FileUpload.js';
import Select from '../components/Select.js';
import AddButton from '../components/AddButton.js';
import TimeInput from '../components/TimeInput.js';
import PopUp from '../components/PopUp.js';
import apiCall from '../../../services/apicall.js';

import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 5000,
    position: "bottom center"
  };
  
class FeedContainer extends Component {
    constructor(){
        super();

        this.state = {
            type :"Team1",
            title:"",
            description:"",
            reflink:"",
            scheduler:new Date(),
            retentionTime:"",
            uploadImg:[],
            errorMsg: {},
            popUp :{showAlert:false,type:"",title:"",message:""},            
        };

    }

    componentWillMount(){
        if(this.props.feedId!=""){
            let currentFeed = {};
            currentFeed = this.props.feeds.find((feed) => feed._id.$oid ===this.props.feedId);
            console.log("currentFeed :" ,currentFeed);
            this.setState({
                type :currentFeed.audience[0]!=""?currentFeed.audience[0]:"Team1",
                title:currentFeed['headline']!=""?currentFeed['headline']:"",
                description:currentFeed['description']!=""?currentFeed['description']:"",
                reflink:currentFeed['link']!=""?currentFeed['link']:"",
                scheduler:new Date(),
                retentionTime:currentFeed['retentiontime']!=""?currentFeed['retentiontime']:"",
                uploadImg:[],
                errorMsg: {},
                popUp :{showAlert:false,type:"",title:"",message:""},            
            });
        }
    }
        onTypeChange = (event) => {
            this.setState({type : event.target.value});
        }

        onTitleChange = (event) =>{
            this.setState({title : event.target.value});
            
        }

        onDescriptionChange = (event) =>{
            this.setState({description : event.target.value});
        }

        onSchedulerChange = (date) =>{
            this.setState({scheduler : date});
        }

        onRetentionTimeChange = (event) =>{
            this.setState({retentionTime : event.target.validity.valid?event.target.value:this.state.retentionTime});
        }

        onReflinkChange = (event) =>{
            this.setState({reflink : event.target.value});
        }

        onUploadImgChange = (picture) => {
            this.setState({uploadImg : this.state.uploadImg.concat(picture),});
        }

        onPopUpButton = (event) =>{
            console.log("onPopUpButton called");
        }
        
        handlingValidation = () => {
              let isFormValid = true;
              let error = {};
            if(this.state.type ==''){
                error["type"] = 'Type cannot be Empty';
                isFormValid = false;
            }
            if(this.state.title ==''){
                isFormValid = true;
                error["title"] = 'Title cannot be Empty';
                isFormValid = false;
            }
            if(this.state.description ==''){
                isFormValid = true;
                error["description"] = 'Description cannot be Empty';
                isFormValid = false;
            }
            if(this.state.reflink ==''){
                isFormValid = true;
                error["reflink"] = 'Referencelink cannot be Empty';
                isFormValid = false;
            }
            if(this.state.retentionTime ==''){
                isFormValid = true;
                error["retentionTime"] = 'RetentionTime cannot be Empty';
                isFormValid = false;
            }
            this.setState({errorMsg : error});
            return isFormValid;
          }
        onAddButtonClick = (event) =>{
        event.preventDefault();

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        if(this.handlingValidation()){
            if(this.props.feedId!=""){
                this.updateExistingFeed();
            }else{
                this.insertNewFeed();
            }

        }

    }
 

    insertNewFeed =() =>{

        let startDate = this.state.scheduler.toLocaleDateString();
        startDate = startDate.split('/');
        let startRetieveDate = startDate[2]+''+startDate[0]+''+startDate[1];
        let endDate = this.state.scheduler.addDays(2).toLocaleDateString();
        endDate = endDate.split('/');
        let endRetieveDate = endDate[2]+''+endDate[0]+''+endDate[1];

        const data ={
            image :this.state.uploadImg[0]!=null?this.state.uploadImg[0].name:"",
            audience :[this.state.type],
            idfeed:"",
            link:this.state.reflink,
            description:this.state.description,
            source:"",
            startdate:startRetieveDate,
            likecount:"",
            enddate:endRetieveDate,
            iscurated:false,
            unlikecount:"0",
            publishedDate:startRetieveDate,
            categories:"",
            headline:this.state.title,
            retentiontime:this.state.retentionTime
        }
        console.log(JSON.stringify(data));
        apiCall(`insertnewfeed`,'POST',data)
        .then(response => {
            if('OK' == response.response){
                let popUp = {};
                popUp["showAlert"] = true;
                popUp["type"] = "success";
                popUp["title"] = "Success";
                popUp["message"] = "Feed inserted successfully"
                this.setState({popUp : popUp});
            }
        })
        .catch(error => {
            console.error(error.data);
        });
    }

    updateExistingFeed =() =>{

        let startDate = this.state.scheduler.toLocaleDateString();
        startDate = startDate.split('/');
        let startRetieveDate = startDate[2]+''+startDate[0]+''+startDate[1];
        let endDate = this.state.scheduler.addDays(2).toLocaleDateString();
        endDate = endDate.split('/');
        let endRetieveDate = endDate[2]+''+endDate[0]+''+endDate[1];

        const data ={
            image :this.state.uploadImg[0]!=null?this.state.uploadImg[0].name:"",
            audience :[this.state.type],
            idfeed:"",
            link:this.state.reflink,
            description:this.state.description,
            source:"",
            startdate:startRetieveDate,
            likecount:"",
            enddate:endRetieveDate,
            iscurated:false,
            unlikecount:"0",
            publishedDate:startRetieveDate,
            categories:"",
            headline:this.state.title,
            retentiontime:this.state.retentionTime,
            _id :{$oid :this.props.feedId}
        }
        console.log(JSON.stringify(data));
        apiCall(`updatefeed`,'POST',data)
        .then(response => {
            if('OK' == response.response){
                let popUp = {};
                popUp["showAlert"] = true;
                popUp["type"] = "success";
                popUp["title"] = "Success";
                popUp["message"] = "Feed updated successfully"
                this.setState({popUp : popUp});
            }
        })
        .catch(error => {
            console.error(error.data);
        });
    }
    render(){
        return(
            <div>
                <Provider template={AlertTemplate} {...options}>
                <Select onChange = {this.onTypeChange.bind(this)}/>
                <InputField className={'title-input'} id={'title'} title={'TITLE'} value={this.state.title} error ={this.state.errorMsg['title']} onChange={this.onTitleChange.bind(this)}/>
                <TextArea className={'description-input'} id={'description'} title={'DESCRIPTION'} value={this.state.description} error ={this.state.errorMsg['description']} onChange={this.onDescriptionChange.bind(this)}/>
                <InputField className={'refLink-input'} id={'refLink'} title={'REFERENCE LINK'} value={this.state.reflink} error ={this.state.errorMsg['reflink']} onChange={this.onReflinkChange.bind(this)}/>
                <Scheduler className={'scheduler-input'} id={'scheduler'} title={'SCHEDULER'} value={this.state.scheduler} error ={this.state.errorMsg['scheduler']} onChange={this.onSchedulerChange.bind(this)}/>
                <TimeInput className={'retentionTime-input'} id={'retentionTime'} title={'RETENTION TIME'} value={this.state.retentionTime} error ={this.state.errorMsg['retentionTime']} onChange={this.onRetentionTimeChange.bind(this)}/>
                <FileUpload className={'uploadImg-input'} id={'uploadImg'} title={'UPLOAD ANY ASSOCIATED IMAGES'} error ={this.state.errorMsg['uploadImg']} onChange={this.onUploadImgChange.bind(this)}/>
                <AddButton onClick = {this.onAddButtonClick.bind(this)}/>
                <PopUp showAlert ={this.state.popUp['showAlert']} type={this.state.popUp['type']} title ={this.state.popUp['title']} message ={this.state.popUp['message']} onClose ={this.props.closeModal} on/>
                </Provider>
            </div>
        );
    }
}


export default FeedContainer;