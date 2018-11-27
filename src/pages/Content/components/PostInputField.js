import React from 'react';
import PropTypes from 'prop-types';

const PostInputField = ({type,className, title, id, value, onChange}) => (
  <div className={`form-group ${className}`}>
    <label htmlFor={id}>{title}</label>
    <input type={type} className="form-control" id={id} value={value} onChange={onChange}/>
  </div>
);

PostInputField.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PostInputField;
