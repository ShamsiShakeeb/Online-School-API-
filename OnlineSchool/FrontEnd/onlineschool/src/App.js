//import logo from './logo.svg';
//import './App.css';
import {Home} from './Component/HomePage'
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom'
import {Student} from './Component/StudentProfile'
import {Admin} from './Component/AdminProfile'
import {Tutorial} from './Component/Tutorials'
import {Teacher} from './Component/TeacherPage'
import {WatchTutorial} from './Component/WatchTutorial'



function App() {

  return (
    <BrowserRouter>

       <Switch>
        <Route exact path='/' render={
          () => <Home/>
        }/>
        <Route path='/StudentProfile' component = {Student} />

        <Route path='/AdminProfile' component = {Admin} />

        <Route path='/Tutorials' component = {Tutorial} />

        <Route path='/TeacherProfile' component = {Teacher} />

        <Route path='/WatchTutorial' component = {WatchTutorial} /> 
        
        <Route render={
          () => <h1> Page Not Found</h1>
        }/>

       </Switch>

      </BrowserRouter>

  );
}

export default App;
