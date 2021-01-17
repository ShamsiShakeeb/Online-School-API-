import React,{Component} from 'react'
import {Navbar} from './Navbar'
import {Courses} from './Courses'
import { Redirect } from "react-router-dom";
import {AddNewTutorial} from './AddTutorial';
import {Key} from './KeyFile'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export class Teacher extends Component{

        constructor(props){
            super(props);

            var store = localStorage.getItem('UserID');
            var user = localStorage.getItem('User');

            this.state = {
                authorization : String(store),
                User : user,
                userName : '',
                userEmail : '',
                userPhone : '',
                userAddress : '',
                userIMG : '',
                cv : '',
            }

        }

        componentDidMount(){
           
            if(this.state.authorization =='undefined'){
                return <Redirect to='/' />
            }
            if(this.state.User!='Teacher'){
                return <Redirect to='/' />
            }
          
            fetch('http://localhost:50599/Teacher/Profile/'+this.state.authorization , 
            
            {headers: {
                'ApiKey': Key
            }}
            
            )
            // We get a response and receive the data in JSON format...
            .then(response => response.json())
            // ...then we update the state of our application
            .then(
              data =>{
              
                  console.log(data.data)
                  this.setState({userName: data.data.name})
                  this.setState({userEmail: data.data.email})
                  this.setState({userPhone: data.data.phone})
                  this.setState({userAddress: data.data.address})
                  this.setState({userIMG: 'http://localhost:50599/TeacherProfilePicture/'+data.data.profile_Image_Path})
                  this.setState({cv: 'http://localhost:50599/TeacherCV/'+data.data.cV_Path})
              }
                
             )

        }

      /*  componentDidMount(){
          
        }*/

      
      
        render(){
           
            const welcome = {
                top: 50
                
            }

            const AddCourse = () =>{
              
                var queryString =  window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const elem = document.getElementById('abc');

                if (elem) {
                  elem.scrollIntoView();
                }
                    return (
                     
                       <AddNewTutorial CourseId = {urlParams.get('cid')} /> 
                      
                    )
                
            }

            if(this.state.authorization =='undefined'){
                return <Redirect to='/' />
            }
            if(this.state.User!='Teacher'){
                return <Redirect to='/' />
            }

            return(
                <div>
                     <Navbar page="TeacherPage"/> 

                    <div className="container">
                        <div className="row">
                            <section id="courses">
                                <div className="container">
                                    <div className="row">

                                        <div className="col-md-4 col-sm-4">
                                            <div className="feature-thumb">

                                            <img src={this.state.userIMG} height='100' width='100' />
                                             <h3>{this.state.userName}</h3>
                                             <h4> {this.state.userEmail} </h4>
                                             <h5> {this.state.userPhone} </h5>
                                             <p>Address: {this.state.userAddress}</p>
                                            
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>

                    <marquee  style={welcome} id='abc'> <h4>welcome to online school</h4> </marquee >

                            {AddCourse()}
                    
                     <Courses  page="TeacherPage" />
                    
                     </div>
                    </div>
                   
                  

                  
                   
                </div>
            )
        }

}