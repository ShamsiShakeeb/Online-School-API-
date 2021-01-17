import React, {Component} from 'react'
import '../bootstrap.css'
import '../font-awesome.min.css'
import '../owl.carousel.css'
import '../owl.theme.default.min.css'
import '../templatemo-style.css'
import axios from 'axios';
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom'
import {Key} from './KeyFile'


export class Login extends Component{

    constructor(props){
      
        super(props);
        console.log(props);
        this.state = {
            Message : '',
            UserProfile : 'Student',
            URL: '',
            UserId : '',
        }
    }

    UserLogin = () => {

        
        var URL = '';
      
        if(this.state.UserProfile == 'Student'){
            URL = 'http://localhost:50599/Student/Login';
        }
        else if(this.state.UserProfile == 'Teacher'){
            URL = 'http://localhost:50599/Teacher/Login';
        }
        else if(this.state.UserProfile == 'Admin')
        {
            URL = 'http://localhost:50599/Admin/Login';
        }

        var data = {
            email : document.getElementById('mail').value,
            password : document.getElementById('pass').value,
        };
      
        if(data.email !=null || data.password !=null)
        {
             var svr = true;
         //console.log("Dhur: "+URL);
             axios.post(URL,data,{headers: {
            'ApiKey': Key
             }}).then(x=> {this.setState({Message:  x.data.data })   

          if(x.data.data=='/Student/Profile'  ){

             this.setState({URL: '/StudentProfile'});
             this.setState({UserId: x.data.userId});
             localStorage.setItem('UserID',x.data.userId);
             localStorage.setItem('User','Student');

          }
          else if(x.data.data == '/Teacher/Profile')
          {
            this.setState({URL: '/TeacherProfile'});
            this.setState({UserId: x.data.userId});
            localStorage.setItem('UserID',x.data.userId);
            localStorage.setItem('User','Teacher');
          }
          else if(x.data.data == '/Admin/Profile'){
            
            this.setState({URL: '/AdminProfile'});
            this.setState({UserId: x.data.userId});
            localStorage.setItem('UserID',x.data.userId);
            localStorage.setItem('User','Admin');
          }
          else{
            svr=false;
          }
          if(svr){
            try{
            document.getElementById('sub').click();
            }
            catch(e){
            console.log(e);
            }
          }
        
          });
        
         
          
        }
         
        
    }

    User = () =>
    {
        var user = document.getElementById('userL').value;
        console.log("dsdf: "+user);
        this.setState({UserProfile:user});
    }

     render(){
         return(
            
            <div className="col-md-offset-1 col-md-4 col-sm-12">
            <div className="entry-form">
                
                      <h2>Sign in</h2>

                      <input type="email" id='mail' className="form-control" placeholder="Your email address" required=""/>

                      <input type="password" id='pass' className="form-control" placeholder="Your password" required=""/>

                      <select id='userL' onChange={() => this.User()}>

                          <option value='Student'> I am a Student </option>
                          <option value='Teacher'> I am a Teacher </option>
                          <option value='Admin'> I am a Admin </option>

                      </select>
                      <br/>
                      <h3>  {this.state.Message} </h3>
                     
                      
                      <Link to={{
                          
                          pathname : this.state.URL
 
                          }} className="submit-btn form-control" id="sub" onClick={ () => this.UserLogin()}> Login </Link>
              </div>

             

       </div>

         )
     }

}
