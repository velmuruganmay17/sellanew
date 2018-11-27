import React from 'react';
import ImageUploader from 'react-images-upload';

const FileUpload = (props) => {

    return(<div className={`form-group ${props.className}`}>
    <label htmlFor={props.id}>{props.title}</label>
    <ImageUploader withIcon={true} buttonText='Choose images' onChange={props.onChange} imgExtension={['.jpg', '.gif', '.png', '.gif']} maxFileSize={5242880}/>
  </div>);
}

export default FileUpload;