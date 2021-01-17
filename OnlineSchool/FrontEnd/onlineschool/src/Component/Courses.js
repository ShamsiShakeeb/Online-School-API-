import React,{Component} from 'react'
import {Key} from './KeyFile'
import {BrowserRouter,Link,Route, Switch} from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export class Courses extends Component{

       constructor(props){
           super(props);
           this.state = {
                eachCourse : [],
                msg : '',
                description : '',
              
           }
       } 
       
     
       
       componentDidMount()
       {
           fetch('http://localhost:50599/Home/Courses',

               {
                   headers: {
                       'ApiKey': Key
                   }
               }

           )
               // We get a response and receive the data in JSON format...
               .then(response => response.json())
               // ...then we update the state of our application
               .then(
                   data => {

                        console.log("All Course: ",data.data);

                        var element = [];

                        var addcourse = [];

                       if (data.success == true) {

                           for (var i = 0; i < data.data.length; i++) {
                               var imgsrc = 'http://localhost:50599/Course/' + data.data[i].img_Path;

                               var goURL = '';

                               if (this.props.page == 'HomePage') {

                                   goURL = '/Tutorials?cid=' + data.data[i].cid;
                                   this.setState({ msg: 'Our Courses' });
                                   this.setState({ description: 'Enjoy Our Free Courses' });

                               }

                               else if (this.props.page == 'TeacherPage') {
                                   goURL = '/TeacherProfile?cid=' + data.data[i].cid;
                                   this.setState({ msg: 'Add Course' });
                                   this.setState({ description: 'Add New Tutorials Under These Courses' });

                               }

                               element.push
                                   (
                                       <Link to={goURL}>
                                           <div className="col-md-4 col-sm-4">
                                               <div className="feature-thumb">
                                                   <img src={imgsrc} className="img-responsive" />
                                                   <h3>{data.data[i].course_Title}</h3>
                                                   <p>{data.data[i].course_Description}</p>
                                               </div>

                                           </div>
                                       </Link>
                                   );


                           }
                       }

                        this.setState({eachCourse:element});
                   }

               )
       }

      
       
       
       
       render(){
           return(
          
               <section id="feature">
                   
                   <div className="container">
                       <div className="row">
                      
                           <div className="col-md-12 col-sm-12">
                               <div className="section-title">
                                   <h2> {this.state.msg} <small>{this.state.description}</small></h2>
                               </div>
                           </div>
                          {this.state.eachCourse}
                       </div>   
                   </div>
               </section>

           )
       }
}
