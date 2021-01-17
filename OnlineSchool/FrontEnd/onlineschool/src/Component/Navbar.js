import React,{Component} from 'react'
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom'
import './component.css'
import axios from 'axios';
import {Key} from './KeyFile'

export class Navbar extends Component{

          constructor(props){
            
               super(props);

               this.state = {
                    option : [],
                    CreateNewCourse : [],
                    Message:'',
               }
          }

          HideCreateCourse = () => 
          {
               this.setState({CreateNewCourse:[]});
               this.setState({Message:''});
          }

          toBase64 = file => new Promise((resolve, reject) => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = () => resolve(reader.result);
               reader.onerror = error => reject(error);
           });

          AddCourse = async () =>{
                const file = document.querySelector('#courseImg').files[0];
                var FileToBase64 = await this.toBase64(file);
                console.log('File to Base64: '+FileToBase64);

                var data = {
                    title : document.getElementById('courseTitle').value,
                    description : document.getElementById('courseDescription').value,
                    photo : FileToBase64.split(',')[1],
                };
                
                var URL = '';

                if(localStorage.getItem('User')=='Admin'){
                    console.log('User ID= ',localStorage.getItem('UserId'));
                URL = 'http://localhost:50599/Admin/CreateCourse/'+localStorage.getItem('UserID');

                }

               await axios.post(URL,data,{headers: {
                    'ApiKey': Key
                  }}).then(x=> this.setState({Message:  x.data.data }));
          }

          CourseCreate = () =>
          {

               var newCourse = [];
               newCourse.push
               (  
                   
                   <section id="testimonial">
                    <a onClick = {() => this.HideCreateCourse()}class="close"></a>
                    <div className="container">
                       <div className="form-horizontal" >
                           <h2>Create course</h2>
                           <div className="form-group">
                               <label for="fullname" className="col-sm-3 control-label">Course Title</label>
                               <div className="col-sm-9">
                                   <input type="text" name="name" id="courseTitle" placeholder="Course Title" className="form-control" autofocus />
                               </div>
                           </div>
   
                           <div className="form-group">
                               <label for="email" className="col-sm-3 control-label">Course Description</label>
                               <div className="col-sm-9">
                                   <input type="textarea" name="mail" id="courseDescription" placeholder="Course Description" className="form-control" />
                               </div>
                           </div>
   
   
                           <div className="form-group">
                               <label for="img" className="col-sm-3 control-label">Select Profile Picture:</label>
                               <div className="col-sm-4">
                                   <input type="file" id="courseImg" name="img" accept="image/*" className="form-control" />
                                   <br/>
                                  
                               </div>
                           </div>
   
   
                           <div className="form-group">
                               <div className="col-sm-9 col-sm-offset-3">
                                   <button onClick={() => this.AddCourse()} className="btn btn-primary btn-block">Create Course</button>
                               </div>
                           </div>
   
   
   
                       </div>
                   </div>
   
                
   
               </section> 


               );
   
               this.setState({CreateNewCourse:newCourse});
           }

          componentDidMount()
          {
            var userOption = [];
           
                if(this.props.page=="HomePage")
                {
                     userOption.push(<li><a href="#" className="smoothScroll">Home</a></li>);
                     userOption.push(<li><a href="#about" className="smoothScroll">Sign In</a></li>);
                     userOption.push(<li><a href="#team" className="smoothScroll">Our Teachers</a></li>);
                     userOption.push(<li><a href="#feature" className="smoothScroll">Courses</a></li>);
                     userOption.push(<li><a href="#testimonial" className="smoothScroll">Registration</a></li>);
                     userOption.push(<li><a href="#contact" className="smoothScroll">Contact</a></li>);
                  
               }
               else if(this.props.page=="AdminPage")
               {
                    userOption.push(<li><a href="/" className="smoothScroll">Home</a></li>);
                    userOption.push(<li><a href="#testimonial" onClick={() => this.CourseCreate()} className="smoothScroll">Create Course</a></li>);
               }

               else if(this.props.page=="TeacherPage")
               {
                userOption.push(<li><a href="/" className="smoothScroll">Home</a></li>);
                userOption.push(<li><a href="#courses"  className="smoothScroll">My Details</a></li>);
                userOption.push(<li><a href="#feature"  className="smoothScroll">Courses</a></li>);
               }

               else if(this.props.page=="StudentPage")
               {
                userOption.push(<li><a href="#courses"  className="smoothScroll">My Details</a></li>);
                userOption.push(<li><a href="#feature"  className="smoothScroll">Courses</a></li>);
               }

              this.setState({option : userOption});
          }

        render(){
            return (
                <div>
     <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
     <div className="container">

          <div className="navbar-header">
               <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon icon-bar"></span>
                    <span className="icon icon-bar"></span>
                    <span className="icon icon-bar"></span>
               </button>
               <a href="/" className="navbar-brand">Online School</a>
          </div>

         
          <div className="collapse navbar-collapse">
               <ul className="nav navbar-nav navbar-nav-first">
                    {this.state.option} 
               </ul>

               <ul className="nav navbar-nav navbar-right">
                    <li><a href="/"><i className="fa fa-phone"></i> +880 1646329717</a></li>
               </ul>
          </div>

     </div>
</section>
                         <h3>{this.state.Message}</h3>
                         {this.state.CreateNewCourse}
                         
</div>
            )
        }

}