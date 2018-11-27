import React,{Component} from 'react';
import FeedContainer from './containers/FeedContainer.js';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class NewFeed extends Component{
        render(){
            return(
                <div>
                    <FeedContainer feeds={this.props.feeds} feedId={this.props.feedId} closeModal={this.props.closeModal}/>
                </div>
            )
        }

}