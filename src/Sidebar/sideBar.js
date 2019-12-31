import React from "react"
import OutputReleaseTable from '../Projects/container/outputStatisticsTable';
import StoreyPointTable from '../Projects/container/storyPointTable';
import {  Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link,withRouter } from 'react-router-dom';
import Project from '../Projects/component/projects';
import "../Assets/loginError.css"

class SidebarExampleVisible extends React.Component{
  render(){
    console.log("this.props : ",this.props);
    return(
      <Sidebar.Pushable as={Segment} style={{ height:"750px"}}>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
     
    >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        



      <Menu.Item as="a">
        <Icon name="user" />
        {localStorage.getItem('activeUser')}
      </Menu.Item>

      <Menu.Item as={ Link } to="/tablesheet">
        <Icon name="list" />
          List of Projects
      </Menu.Item>

      <Menu.Item as={Link} to="/tablesheet/table1">
        <Icon name="table" />
          Release Multiple Output Statistics 
      </Menu.Item>

      <Menu.Item as={ Link } to="/tablesheet/table2">
        <Icon name="table" />
          Story Points by Assignee and Status
      </Menu.Item>

      <Menu.Item as={ Link } to="/logout">
        <Icon name="home" />
        Logout
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic>
        {this.props.match.path === "/tablesheet/table1" ?
          <OutputReleaseTable /> : null
        } 
        {this.props.match.path === "/tablesheet/table2" ? 
         <StoreyPointTable /> : null
        }
        {this.props.match.path === "/tablesheet" ? 
        <Project /> : null }
        
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>

    )
  }
}
//const SidebarExampleVisible = () => (
  

export default withRouter(SidebarExampleVisible);
