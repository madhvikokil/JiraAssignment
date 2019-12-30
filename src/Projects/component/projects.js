import React from 'react';
import FetchApi from '../../utility/apiCalls';
import { Button } from 'semantic-ui-react';


class Projects extends React.Component{

    state = {
        projects:[],
        length:''
    }

    onClickHandler = (id) => {
        localStorage.setItem('project',id);
        this.props.history.push('/tablesheet/table1');
    }

    componentDidMount(){
        
        const url = localStorage.getItem('url');
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
                <Button class="ui primary button" onClick={() =>this.onClickHandler(id)}>{id}</Button><br/><br/></>
            ))
        }
       
        return(
            <>
            <h2>List of Projects</h2>
            <br />
            {project}
            </>
        )
    }
}

export default Projects;