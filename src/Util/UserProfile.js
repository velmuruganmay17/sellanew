import React,{Component} from 'react';

var UserProfile = (function() {
    let full_name = "";
    let session =""; 
  
    let getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };

    let getSession = function() {
        return session;
    }
  
    let setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };
    let setSession = function(value) {
        session = value;     
        // Also set this in cookie/localStorage
      }; 

    let checkSessionAvailable = function() {
      return (session!=null && session!= '') ? true:false; 
    }

    return {
      getName: getName,
      setName: setName,
      getSession: getSession,
      setSession: setSession,
      checkSessionAvailable:checkSessionAvailable,
    } 
  })();
  
  export default UserProfile;