import React from "react";
import FetchApi from "../../utility/apiCalls";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";


class Projects extends React.Component{

    state = {
        projects:[],
        length:""
    }

    onClickHandler = (id) => {
        localStorage.setItem("project",id);
        this.props.history.push("/tablesheet/table1");
    }

    componentDidMount(){
        
        const url = localStorage.getItem("url");
        FetchApi.callApi(`${url}/rest/api/3/project`)
        .then(res =>{
                     
            for(let i=0;i<res.length;i++){
                this.setState({projects:[...this.state.projects,res[i].key]})
            }
            
        }).catch(error =>{
            alert(error);
        })
    }

    render(){
        
        let project;
        if(this.state.projects.length > 0){
            project =
            this.state.projects.map(id => (<>
                <Button class="ui primary button" style={{float:"left",marginTop:"20px",marginLeft:"40px"}} onClick={() =>this.onClickHandler(id)}>{id}</Button><br/><br/><br/><br/></>
            ))
        }
       
        return(
           
            <>
            <h1 style={{color:"teal"}}>JIRA STATUS APPLICATION</h1>
            <Button class="ui button"  style={{float:"right"}} as={Link} to ="/">Logout</Button>

            <h2 style={{float:"left",marginLeft:"20px",marginTop:"50px"}}>List of Projects</h2>
            <br /><br/><br/><br/><br/><br/>
            {project}
            </>
        )
    }
}

export default Projects;