import React from 'react';
import Simplert from 'react-simplert';

const PopUp = (props) => {

    return(
        <Simplert showSimplert={props.showAlert}
        type={props.type}
        title={props.title}
        message={props.message}
        onClose={props.onClose}
        onConfirm={props.onClose}/>
       
    );

}
export default PopUp;