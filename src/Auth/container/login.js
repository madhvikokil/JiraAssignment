import React from "react";
import { Form } from "semantic-ui-react-form-validator";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import FetchApi from "../../utility/apiCalls";
import "../../Assets/loginError.css";
import "../../Assets/download.jpeg";
import FormElements from "../../HOC/formElements";
import { withRouter } from "react-router-dom";
import { emailInput, tokenInput, urlInput} from "../../Constants/constLogin";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:"",
            token:"",
            url:"",
            errDiv:""
        }
      }
    
      loginHangler = () => {
        
            let a = window.btoa(`${this.state.email}:${this.state.token}`);
            localStorage.setItem("token",a);
          
            FetchApi.callApi(`${this.state.url}/rest/api/3/project`)
            .then(res=>{
                console.log("resposne : ",res);
            if(res.length === 0) {
                alert("InCorrect email");
                
            }
            if(res.error){
                alert("incorrect");
            }
            else if(res.length !== 0){
                localStorage.setItem("url",`${this.state.url}`);
                const str = this.state.email;
                const activeUser = str.split('@');
                localStorage.setItem("user",activeUser[0]);

                alert("Successfully Logged...");
                this.props.history.push("/tablesheet");
            }
            
        }).catch(error=>{
            console.log("error : ",error);
            alert("Invalid User",error);
    })
    
}

    onChangehandler = (field,event) => {
        this.setState({[field] : event.target.value})
    }

    render(){
         
        return(<><br/><br />
            <h1 style={{color:"black"}}>JIRA DASHBOARD APPLICATION</h1>
            <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                
                <Header as="h1" color="teal" textAlign="center">
                    
                Log-in to Jira Account
                </Header>
                    <Form size="huge" onSubmit={this.loginHangler}>
                        <Segment stacked>
                    
                    {this.props.inputHere({ ...emailInput, onChange:(event)=> this.onChangehandler("email", event), value:this.state.email})}
                    {this.props.inputHere({...tokenInput,onChange:(event)=> this.onChangehandler("token", event), value:this.state.token})}
                    {this.props.inputHere({...urlInput,onChange:(event) => this.onChangehandler("url", event), value:this.state.url})}

                    <Button color="teal" fluid size="large" >Login</Button>
                    
                    </Segment>
                </Form>
            </Grid.Column>
            </Grid>

            </>
            
        )
    }
}

export default FormElements(withRouter(Login));