import React from 'react';
import './App.css'
import {lazy,Suspense}from 'react';
import {Route,Switch} from 'react-router-dom';
import Logout from './Auth/component/logout';
import SidebarExampleVisible from './Sidebar/sideBar';
const Login = lazy(() => import('./Auth/container/login'));
const OutputStatisticsTable = lazy(() => import('./Projects/container/outputStatisticsTable'));
const storyPointTable = lazy(() => import('./Projects/container/storyPointTable'));
const Projects = lazy(() => import('./Projects/component/projects'));

function App() {
  let routes =(
    <Switch>
      <Route path="/tablesheet" exact component={SidebarExampleVisible} />
      <Route path="/tablesheet/table1" exact component={SidebarExampleVisible} />
      <Route path="/tablesheet/table2" component={SidebarExampleVisible} />
      <Route path="/logout"  component={Logout} /> 
      <Route path="/" exact component={Login} />
  </Switch>
  )
  return (
    <div className="App">
     <Suspense fallback={<p>Loading...</p>}>
      {routes}
      </Suspense>
      </div>
  );
}

export default App;
