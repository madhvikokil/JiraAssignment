import React from 'react';
import { Input } from 'semantic-ui-react-form-validator';

const InputHere =(props) => {
  
    return(<>
    
    <Input type="text" 
             iconPosition = 'left' 
             validators = {["required"]}
             errorMessages = {["Field Required"]}
             placeholder = {props.placeholder}
             value = { props.value}
             onChange = {props.onChange}
             icon = { props.icon}
            ></Input></> )
}

const objectStorage ={
    inputHere : InputHere,
    
    
}
export default (WrappedComponent) => {
    return function wrappedRender(args){
        return <WrappedComponent {...objectStorage}/>
    }
}