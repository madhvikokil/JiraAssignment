import React from "react";
import FetchApi from "../../utility/apiCalls";
import FetchTable from "../../utility/tableContent";
import "../../Assets/tableEdit.css";
import { ClipLoader } from 'react-spinners';

class Fetch extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      data:[],
        actualData:[],
        length:"",
        totalCount:[],
        loading:false
    }
  }
  
  
  componentDidMount = () => { 
     
      const project = localStorage.getItem("project");
      const url = localStorage.getItem("url");
      const arrayOfUsers = [];
      this.setState({loading:true});

      FetchApi.callApi(`${url}/rest/api/2/user/assignable/search?project=${project}`).then(res => {
          for(let i=0;i<res.length;i++){
                arrayOfUsers.push(res[i].name);
          }
          this.setState({data : arrayOfUsers});
               
          for(let i=0;i<this.state.data.length;i++){
              const api = FetchApi.callApi(`${url}/rest/api/3/search?jql=assignee=${this.state.data[i]}`);
              api.then(res => {
       
              let timeOriginalEstimate = 0;
              let storyPoint = 0;
              let timeEstimate = 0;
              let timeSpent = 0;
              const count = res.total;
              let issueCountSum = 0;
              let storyPointSum = 0;
              let originalSum = 0;
              let remainingSum = 0;
              let spentSum = 0;
              const anotherArray = []
              let finalCount = 0;
      
              for(let i = 0; i < count ; i++){
                
                if(res.issues[i].fields.project.key === `${[project]}`) {
                
                  storyPoint = storyPoint +  res.issues[i].fields.customfield_10024;
                  timeEstimate = timeEstimate + res.issues[i].fields.timeestimate;
                  timeSpent = timeSpent + res.issues[i].fields.timespent;
                  timeOriginalEstimate = timeOriginalEstimate + res.issues[i].fields.timeoriginalestimate;
                  anotherArray.push(res.issues[i].fields.assignee.name);
                 }
      
                 finalCount = anotherArray.length;
              }
              
              const value = Math.floor(timeSpent/3600);
              const value2 = Math.floor(timeOriginalEstimate/3600);
              const value3 = Math.floor(timeEstimate/3600);
      
              const obj ={
                  user : res.issues[0].fields.assignee.name,
                  issue_count : finalCount,
                  story_Points : storyPoint,
                  Original_Estimate_in_hours : value2,
                  remaining_Estimate_in_hours : value3,
                  time_Spent_in_hours : value
                }
             
              this.setState({actualData:[...this.state.actualData,obj]});
              if(this.state.data.length-1 === this.state.actualData.length-1) {
      
                for(let i=0;i<this.state.actualData.length;i++) {
                  issueCountSum = issueCountSum + this.state.actualData[i].issue_count;
                  storyPointSum = storyPointSum + this.state.actualData[i].story_Points;
                  originalSum = originalSum + this.state.actualData[i].Original_Estimate_in_hours;
                  remainingSum = remainingSum + this.state.actualData[i].remaining_Estimate_in_hours;
                  spentSum = spentSum + this.state.actualData[i].time_Spent_in_hours;
                }
      
                const obj2 = {
                    issueCountSum : issueCountSum,
                    storyPointSum : storyPointSum,
                    originalSum : originalSum,
                    remainingSum : remainingSum,
                    spentSum : spentSum
                }
      
                this.setState({totalCount:obj2});
                localStorage.setItem("total",this.state.totalCount.issueCountSum);
                localStorage.setItem("issuecount",JSON.stringify(obj2));
                this.setState({loading:false})
              
              }  
                   
            }).catch(error => {
              alert(error);
            })
          }  
       
        }).catch(error => {
            alert(error);
            })
      }

  anotherTable = () => {
      this.props.history.push("/tableSheet/table2");
    }
     
    render(){
  
    let posts ;
    if (this.state.actualData.length > 0) {
      posts =   <> 
      <h3>JIRA STATUS APPLICATION </h3>
      <p className="tableHeader">Release Multiple Output Statistics</p>
        <table className="table">
          <thead className="headerStyle">
           
            <tr >
              {FetchTable.tableHeader(this.state.actualData)}
            </tr>
          </thead>

          <tbody>
              {FetchTable.tableRow(this.state.actualData,this.state.totalCount)}
          </tbody>
          
          {this.state.totalCount ? 
          <tfoot >
            <tr className="specificRowBackground">
              <td className="editRow"><b>Total:</b> </td> {FetchTable.tableFooter(this.state.totalCount,"table1")}
            </tr>
             
         <tr className="editRow" ><td>{this.state.totalCount.issueCountSum} total issues </td></tr>
         
          </tfoot> : null}
        </table>
        <hr/><br/>
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
      </>
    )
  }
}

export default Fetch;