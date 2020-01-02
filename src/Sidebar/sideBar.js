import React from "react"
import OutputReleaseTable from '../Projects/container/outputStatisticsTable';
import StoreyPointTable from '../Projects/container/storyPointTable';
import {  Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { NavLink,withRouter } from 'react-router-dom';
import Project from '../Projects/component/projects';
import "../Assets/loginError.css"

class SidebarVisible extends React.Component { 

  render(){
    return(
      <Sidebar.Pushable as={Segment} style={{ height:"880px"}}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >

      {this.props.match.path === "/tablesheet" ?<>
        <Menu.Item >
          <Icon name="user" />
            {localStorage.getItem('user')}
        </Menu.Item>

        <Menu.Item as={ NavLink } to="/logout">
          <Icon name="home" />
          Logout
        </Menu.Item></> : null
      }

      {this.props.match.path !== "/tablesheet" ? 
      <>
      <Menu.Item >
        <Icon name="user" />
         {localStorage.getItem('user')}
      </Menu.Item>

      <Menu.Item as={ NavLink } exact to="/tablesheet">
        <Icon name="list" />
            List of Projects
      </Menu.Item>

      <Menu.Item as={NavLink} to="/tablesheet/table1">
        <Icon name="table" />
            Release Multiple Output Statistics 
      </Menu.Item>

      <Menu.Item as={ NavLink } to="/tablesheet/table2">
        <Icon name="table" />
            Story Points by Assignee and Status
      </Menu.Item>

      <Menu.Item as={ NavLink } to="/logout">
        <Icon name="home" />
          Logout
      </Menu.Item>
      </> : null
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  
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

export default withRouter(SidebarVisible);
