import React from "react";
import FetchApi from "../../utility/apiCalls";
import { withRouter} from "react-router-dom";
import '../../Assets/project.css';
import { ClipLoader } from 'react-spinners';

class Projects extends React.Component{

    state = {
        projects:[],
        length:"",
        loading:false
    }
    onClickHandler = (id) => {
        localStorage.setItem("project",id);
        this.props.history.push("/tablesheet/table1");
    }

    componentDidMount(){
        this.setState({loading:true})
        const url = localStorage.getItem("url");
        FetchApi.callApi(`${url}/rest/api/3/project`)
        .then(res =>{
        
            const dummy = res.map((key,index) => { return { value :res[index].key,name:res[index].name}});
			this.setState({projects : dummy});            
            this.setState({loading:false})

        }).catch(error =>{
            alert(error);
        })
    }

    render(){
        
        let project;
        if(this.state.projects){
            project =
            this.state.projects.map(id => (<>
                &nbsp;<button className="ui primary button" style={{float:"left",marginTop:"20px"}} onClick={() =>this.onClickHandler(id.value)}>{id.name}&nbsp; </button>&nbsp;</>
            ))
        }
       
        return(
           <>
            <ClipLoader
            sizeUnit={"100px"}
            size={100}
            color={'#123abc'}
            loading={this.state.loading}
            />
            <h1 style={{color:"teal"}}>JIRA STATUS APPLICATION</h1>
            <div className="project-list">
            <h2 style={{float:"left",marginLeft:"20px",marginTop:"50px"}}>List of Projects</h2>
            <br /><br/><br/><br/><br/><br/>
            {project}</div>
            </>
        )
    }
}

export default withRouter(Projects);