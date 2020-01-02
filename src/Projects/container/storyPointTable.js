import React from 'react';
import FetchApi from '../../utility/apiCalls';
import FetchTable from '../../utility/tableContent';
import '../../Assets/tableEdit.css';
import Chart from '../../Charts/component/pieChart';
import Chart2 from '../../Charts/component/barGraph';
import { ClipLoader } from 'react-spinners';

class Fetch2 extends React.Component{

  state = {
        data:[],
        actualData:[],
        length:"",
        totalCount:[],
        loading:false
    }

  componentDidMount =()=>{ 

      const project = localStorage.getItem('project');
      const url = localStorage.getItem('url');
      const arrayOfUsers = [];
      this.setState({loading:true})
      
      FetchApi.callApi(`${url}/rest/api/2/user/assignable/search?project=${project}`).then(res => {
        for(let i=0;i<res.length;i++){
              arrayOfUsers.push(res[i].name);
            }
            this.setState({data : arrayOfUsers});

              for(let i=0;i<this.state.data.length;i++){
                const api = FetchApi.callApi(`${url}/rest/api/3/search?jql=assignee=${this.state.data[i]}`);
                api.then(res => {
                    let inProgressStoryPointCount = 0;
                    let todoStoryPoint = 0;
                    let doneStoryPoint = 0;
                    let reviewStoryPoint = 0;
                    let acceptedStoryPoint = 0;
                    let resolvedStoryPoint = 0;
                    let inProgressSum = 0;
                    let acceptedSum = 0;
                    let todoSum = 0;
                    let reviewSum = 0;
                    let resolvedSum = 0;
                    let doneSum = 0;
                    let storyPointSum = 0;
                    const anotherArray = [];
                    let storyPoint = 0;
                    const count = res.total;
        
                      for(let i =0;i<count ;i++){
                        if(res.issues[i].fields.project.key ===  `${[project]}`){
                            anotherArray.push(res.issues[i].fields.assignee.name);
                            storyPoint =storyPoint +  res.issues[i].fields.customfield_10024;
                          
                            if(res.issues[i].fields.status.name === "In Progress"){
                                inProgressStoryPointCount = inProgressStoryPointCount + res.issues[i].fields.customfield_10024;
                                
                              }
                            
                             if(res.issues[i].fields.status.name === "To Do" || res.issues[i].fields.status.name === "Open"){
                                todoStoryPoint = todoStoryPoint + res.issues[i].fields.customfield_10024;
                    
                              }
                            
                              if(res.issues[i].fields.status.name === "Done"){
                                doneStoryPoint = doneStoryPoint + res.issues[i].fields.customfield_10024;
                            
                              }
                            
                               if(res.issues[i].fields.status.name === "Review"){
                                reviewStoryPoint = reviewStoryPoint + res.issues[i].fields.customfield_10024;
                                
                              }
        
                               if(res.issues[i].fields.status.name === "Accepted"){
                                acceptedStoryPoint = acceptedStoryPoint + res.issues[i].fields.customfield_10024;
                              }
                            
                               if(res.issues[i].fields.status.name === "Resolved"){
                                resolvedStoryPoint = resolvedStoryPoint + res.issues[i].fields.customfield_10024;
                              }
                          }
                        }
                        
        
                       const obj ={
                           
                            assignee:res.issues[0].fields.assignee.name,
                            open:todoStoryPoint,
                            accepted:acceptedStoryPoint,
                            in_Progress:inProgressStoryPointCount,
                            review:reviewStoryPoint,
                            resolved:resolvedStoryPoint,  
                            done:doneStoryPoint,
                            total:storyPoint
                        }
        
                       this.setState({actualData:[...this.state.actualData,obj]});
                                 
                        if(this.state.data.length-1 === this.state.actualData.length-1){
                          for(let i=0;i<this.state.actualData.length;i++){
                            inProgressSum = inProgressSum + this.state.actualData[i].in_Progress;
                            acceptedSum = acceptedSum + this.state.actualData[i].accepted;
                            todoSum = todoSum + this.state.actualData[i].open;
                            reviewSum = reviewSum + this.state.actualData[i].review;
                            resolvedSum = resolvedSum + this.state.actualData[i].resolved;
                            doneSum = doneSum + this.state.actualData[i].done;
                            storyPointSum = storyPointSum + this.state.actualData[i].total;
                          }
                          const obj2 = {
                            todoSum :todoSum,
                            acceptedSum :acceptedSum,
                            inProgressSum:inProgressSum,
                            reviewSum :reviewSum,
                            resolvedSum :resolvedSum,
                            doneSum :doneSum,
                            storyPointSum:storyPointSum
                          }
                        this.setState({totalCount:obj2});
                        localStorage.setItem('sum',JSON.stringify(obj2));
                    }
                    this.setState({loading:false})
        
              }).catch(error => {
               alert(error);
                  })
              }  
            })
         
         .catch(error => {
        alert(error)
          })
    }

  lastTable=()=>{
        this.props.history.goBack();
    }

  render(){
   
    let posts ;
    if(this.state.actualData.length > 0) {
      posts =   <><br/>
      <p className="tableHeader">Story Points by Assignee and Status</p>
        <table className="table">
          <thead className="headerStyle">
            <tr>
              {FetchTable.tableHeader(this.state.actualData)}
            </tr>
          </thead>

          <tbody>
              {FetchTable.tableRow(this.state.actualData)}
          </tbody>
        {this.state.totalCount ? 

          <tfoot>
            <tr className="specificRowBackground">
              <td className="editRow "><b>Total:</b> </td>{FetchTable.tableFooter(this.state.totalCount)}
            </tr>
          <tr className="editRow  "><td>{localStorage.getItem('total')} total issues</td></tr>
          </tfoot>
        :null}   
       </table><hr/>
        <br/>
        </>
    }
  
  return(
      <>
       <ClipLoader
         
         sizeUnit={"100px"}
         size={100}
         color={'#123abc'}
         loading={this.state.loading}
         />
        {posts}
        {this.state.totalCount.todoSum  ? 
          <Chart style={{float:'right'}}
                  data={this.state.totalCount}
          />  :null}

        {this.state.totalCount.todoSum  ? 
        <Chart2
        data={this.state.totalCount}
        />  :null}
      
  </>

    )
  }
}

export default Fetch2;
