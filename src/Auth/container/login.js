import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import FetchApi from '../../utility/apiCalls';
import '../../Assets/loginError.css';
import FormElements from '../../utility/formElements'
import { withRouter } from 'react-router-dom';
import { emailInput,tokenInput,urlInput}from '../../Constants/constLogin';

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state={

        }
    }
    state ={
        email:'',
        token:'',
        url:'',
        errDiv:''
    }

     showErrorMsg = (msg) => {
         let errorMsg = document.getElementById('errorField');
        errorMsg.className = "show";
        errorMsg.innerText = msg;
        setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); },2000);
      }
    
    listOfProjects = () => {
        let errorMessage="Enter ";
        let flag = false;
        if(this.state.email === "" || this.state.email === undefined){
            flag = true;
            errorMessage += " Email";
        }
       
        if(this.state.token === "" || this.state.token === undefined){
            flag = true;
            errorMessage += " Token";
        }

        if(this.state.url === "" || this.state.email === undefined){
            flag = true;
            errorMessage += " Url";
        }
        
        if(flag)
            this.showErrorMsg(errorMessage);
        

        else{
            let a = window.btoa(`${this.state.email}:${this.state.token}`);
            localStorage.setItem('token',a);
            // superagent
            //     .get(`${this.state.url}/rest/api/3/project`)
            //     .set('Access-Control-Allow-Credentials', '*')
            //     .set('Accept', 'application/json')
            //     .set('Authorization', `Basic ${a}`)
            //     .end((err, res) => {
            //         if (err) { return alert("Invalid User",err)}
            //          if(res.body == null) 
            //         localStorage.setItem('url',`${this.state.url}`);
            //         alert("Successfully Logged...");
            //         this.props.history.push('/tablesheet');
          
            //     })

             FetchApi.callApi(`${this.state.url}/rest/api/3/project`)
        .then(res=>{
            if(res.length === 0) {
                alert("InCorrect email");
                
            }
            else if(res){
                localStorage.setItem('url',`${this.state.url}`);
                alert("Successfully Logged...");
                this.props.history.push('/tablesheet');
            }
            
        }).catch(error=>{
            alert("Invalid User",error);
        })
        }
}

onChangehandler = (field,event) => {
    this.setState({[field] : event.target.value})
    console.log('set value : ',field);
}
    // changeEmail = (event) => {
    //     this.setState({email : event.target.value})
    // }

    // changeToken = (event) => {
    //     this.setState({token : event.target.value})
    // }

    // changeUrl = (event) => {
    //     this.setState({url : event.target.value})
    // }

   
    render(){
         
        return(<>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='teal' textAlign='center'>
                Log-in to your account
                </Header>
               
                    <Form size='large'>
                        <Segment stacked>
                    
                    {this.props.inputHere({ ...emailInput, onChange:(event)=> this.onChangehandler("email", event), value:this.state.email})}
                    {this.props.inputHere({...tokenInput,onChange:(event)=> this.onChangehandler("token", event), value:this.state.token})}
                    {this.props.inputHere({...urlInput,onChange:(event) => this.onChangehandler("url", event), value:this.state.url})}

                    <Button color='teal' fluid size='large' onClick={this.listOfProjects}>
                        Login
                    </Button>
                    </Segment>
                </Form>
            </Grid.Column>
            </Grid>

            <div id="errorField" class={this.state.errDiv}></div>
            </>
            
        )
    }
}

export default FormElements(withRouter(Login));