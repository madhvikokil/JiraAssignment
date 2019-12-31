import React from "react"
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import FetchApi from "../../utility/apiCalls";
import "../../Assets/loginError.css";
import "../../Assets/download.jpeg";
import FormElements from "../../utility/formElements"
import { withRouter } from "react-router-dom";
import { emailInput, tokenInput, urlInput} from "../../Constants/constLogin";

class Login extends React.Component{

    state = {
        email:"",
        token:"",
        url:"",
        errDiv:""
    }

     showErrorMsg = (msg) => {
         let errorMsg = document.getElementById("errorField");
        errorMsg.className = "show";
        errorMsg.innerText = msg;
        setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show"); },2000);
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
            localStorage.setItem("token",a);
          
             FetchApi.callApi(`${this.state.url}/rest/api/3/project`)
        .then(res=>{
            if(res.length === 0) {
                alert("InCorrect email");
                
            }
            else if(res){
                console.log("new response : ",res);
                localStorage.setItem("url",`${this.state.url}`);
                alert("Successfully Logged...");
                this.props.history.push("/tablesheet");
            }
            
        }).catch(error=>{
            alert("Invalid User",error);
        })
        }
}

onChangehandler = (field,event) => {
    this.setState({[field] : event.target.value})
}
    render(){
         
        return(<><br/><br />
            <h1 style={{color:"teal"}}>JIRA STATUS APPLICATION</h1>
            <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                
                <Header as="h1" color="teal" textAlign="center">
                    
                Log-in to Jira Account
                </Header>
               
                    <Form size="large">
                        <Segment stacked>
                    
                    {this.props.inputHere({ ...emailInput, onChange:(event)=> this.onChangehandler("email", event), value:this.state.email})}
                    {this.props.inputHere({...tokenInput,onChange:(event)=> this.onChangehandler("token", event), value:this.state.token})}
                    {this.props.inputHere({...urlInput,onChange:(event) => this.onChangehandler("url", event), value:this.state.url})}

                    <Button color="teal" fluid size="large" onClick={this.listOfProjects}>
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