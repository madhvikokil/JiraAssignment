import React from 'react';
import { Form } from 'semantic-ui-react';

const InputHere =(props) => {
  
    return(<>
    
    <Form.Input type="text" 
             iconPosition = 'left' 
             validators = {["required"]}
             errorMessages = {["Field Required"]}
             placeholder = {props && props.placeholder}
             value = {props && props.value}
             onChange = {props && props.onChange}
             icon = {props && props.icon}
            ></Form.Input></> )
}

const objectStorage ={
    inputHere : InputHere,
    
    
}
export default (WrappedComponent) => {
    return function wrappedRender(args){
        return <WrappedComponent {...objectStorage}/>
    }
}