import React from 'react';
import { Form } from 'semantic-ui-react';

const InputHere =(props) => {
  
    return(<>
    
    <Form.Input type="text" 
             iconPosition='left' 
             class="required"
             placeholder={props && props.placeholder}
             value={props && props.value}
             onChange={props && props.onChange}
             icon={props && props.icon}
            ></Form.Input></> )
}

const objectStorage ={
    inputhere : InputHere,
    
    
}
export default (WrappedComponent) => {
    return function wrappedRender(args){
        return <WrappedComponent {...objectStorage}/>
    }
}