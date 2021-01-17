import React,{Component} from 'react'
import axios from 'axios'
import {Key} from './KeyFile'
import { Redirect } from 'react-router'
import {Navbar} from './Navbar'
import './component.css'

export class WatchTutorial extends Component{

      constructor(props){
          super(props);

          this.state = {
                element : [],
                tutorialProperty : [],
                teacherComment : [],
                studentComment : [],
                Like : 0,
                DisLike : 0,
                tutorialTitle : '',
                tutorialDescription : '',
                Navbar : [],
                visibleStudentComment : 'none',
                visibleTeacherComment : 'none',
                MyComment : [],
                totalStudentComment : 0,
                totalTeacherComment : 0,
               
          }
          
      }

      componentDidMount() 
      {
        this.Comment(null);

        var queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);

        var data = {
            user : localStorage.getItem('User'),
            uid : localStorage.getItem('UserID'),
        }

        var URL = 'http://localhost:50599/Home/WatchTutorial/'+urlParams.get('tid')+'/'+urlParams.get('teid');

        axios.post(URL,data,{headers: {
            'ApiKey': Key
             }}).then(x=> 
            {
               
               if(x.data.success==false)
               {
                  var result =  <h1> Page Not Found </h1>;
                  this.setState({element:result});
               }    
               else{
                   console.log(x.data);
                   var sidebar = [];
                   sidebar.push(<Navbar/>);
                   this.setState({Navbar: sidebar});
                  // console.log("Title, ",x.data.data.tutorial_Title);
                   this.setState({tutorialTitle: x.data.data.tutorial_Title});
                   this.setState({tutorialDescription: x.data.data.tutorial_Description});
                   this.setState({totalStudentComment: x.data.data.studentComment.length});
                   this.setState({totalTeacherComment:x.data.data.teacherComment.length});
                   var StudentLike = 0;
                   var StudentDisLike = 0;
                   var TeacherLike = 0;
                   var TeacherDisLike = 0; 

                   x.data.data.studentLike.forEach(element => {
                       if(element.reactionName==1){
                           StudentLike += element.totalReaction;
                       }
                       else if(element.reactionName==-1){
                           StudentDisLike += element.totalReaction;
                       }
                   });

                   x.data.data.teacherLike.forEach(element => {
                    if(element.reactionName==1){
                        TeacherLike += element.totalReaction;
                    }
                    else if(element.reactionName==-1){
                        TeacherDisLike += element.totalReaction;
                    }
                    });

                  
                   this.setState({Like:(StudentLike+TeacherLike)});
                   this.setState({DisLike:(StudentDisLike+TeacherDisLike)});

                   var tutorial = [];

                   var Video = 'http://localhost:50599/Tutorial/'+x.data.data.tutorial_VideoPath;

                   tutorial.push
                   (
                      
                       <div>
                       <video width='1000px' height='1000px' className="img-responsive" controls autoPlay >
                       <source src={Video} type="video/mp4"  />
                       </video>
                         

                           <h3>Teacher Name: {x.data.data.teacher_Name}</h3>
                           <h5>Teacher Email: {x.data.data.teacher_Email}</h5>
                           <h5>Teacher Phone: {x.data.data.teacher_Phone}</h5>
                         
                        </div>
                   );

                   this.setState({tutorialProperty:tutorial});


                //   this.setState({studentComment:x.data.data.studentComment});

                 this.StudentAllComments(x.data.data.studentComment);
                 this.TeacherAllComments(x.data.data.teacherComment);
                   
               }

            });
      }

    StudentAllComments = (arrayOfComments) => {
        var queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);

        var StudentComments = [];
        var uid = localStorage.getItem('UserID');
        var user = localStorage.getItem('User');

        var mycoment = false;

        for (var i = 0; i < arrayOfComments.length; i++) {
            var svr = true;
            var comment = arrayOfComments[i].comments;

            var row = 1;

            if (comment.length / 150 == 0) {
                row = 1;
            }
            else {
                row = comment.length / 150;
            }
         //   console.log("Row: "+row);

            if (arrayOfComments[i].sid == uid && user == 'Student') {
                // this.setState({MyComment : comment});
                var ownComment = [];
                mycoment = true;

                ownComment.push(
                    <div>
                        <h5> {arrayOfComments[i].studentName} </h5>
                        <textarea id='com' className='img-responsive' rows={row} cols="500" >
                            {comment}
                        </textarea> <br />
                        <button onClick={() => this.SendComment('Student', urlParams.get('tid'))}> Send your Feedback </button>
                    </div>
                );

                this.setState({ MyComment: ownComment });

                svr = false;

            }
            if (svr) {
                StudentComments.push
                    (
                        <div>
                            <h5> {arrayOfComments[i].studentName} </h5>
                            <textarea className='img-responsive' rows={row} cols="500" readOnly={true}>
                                {comment}
                            </textarea>
                        </div>
                    );
            }
            
         }
        this.setState({ studentComment: StudentComments });
        if (uid != null && (user != null && user == 'Student') && mycoment == false) {
            var EmptyCom = [];

            EmptyCom.push(
                <div>
                    <h5> Your Feedback </h5>
                    <textarea id='com' className='img-responsive' rows='3' cols="500" >
                    </textarea> <br />
                    <button onClick={() => this.SendComment(user, urlParams.get('tid'))}> Send your Feedback </button>
                </div>
            );
            this.setState({ MyComment: EmptyCom });
        }
    } 

    TeacherAllComments = (arrayOfComments) => {
        var queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);

        var TeacherComments = [];

        var uid = localStorage.getItem('UserID');
        var user = localStorage.getItem('User');

        var mycoment = false;

        for(var i=0;i<arrayOfComments.length;i++)
        {
        
        var comment = arrayOfComments[i].comments;
        var svr=true; 
           

        var row = 1;

        if(comment.length/150==0){
            row=1;
        }
        else{
            row = comment.length/150;
        }

            if (arrayOfComments[i].teID == uid && user == 'Teacher') {
                var ownComment = [];
                mycoment=true;
                ownComment.push(
                    <div>
                        <h5> {arrayOfComments[i].teacherName} </h5>
                        <textarea id='com'  className='img-responsive' rows={row} cols="500" >
                            {comment}
                        </textarea> <br/>
                        <button onClick={() => this.SendComment('Teacher',urlParams.get('tid'))}> Send your Feedback </button>
                    </div>
                );

                this.setState({ MyComment: ownComment });

                svr = false;
            }
            if (svr) {
                TeacherComments.push
                    (
                        <div>
                            <h5> {arrayOfComments[i].teacherName} </h5>
                            <textarea className='img-responsive' rows={row} cols="500" readOnly={true}>
                                {comment}
                            </textarea>
                        </div>
                    );
            }
        }

        this.setState({teacherComment:TeacherComments});
        if (uid != null && user == 'Teacher' && mycoment == false) {
            var EmptyCom = [];

            EmptyCom.push(
                <div>
                    <h5> Your Feedback </h5>
                    <textarea id='com' className='img-responsive' rows='3' cols="500" >
                    </textarea> <br />
                    <button onClick={() => this.SendComment(user, urlParams.get('tid'))}> Send your Feedback </button>
                </div>
            );
            this.setState({ MyComment: EmptyCom });
        }
    }

      SendComment = (user, tutorialID) =>{
             var queryString =  window.location.search;
             const urlParams = new URLSearchParams(queryString);
            if(user=='Student')
            {
                var URL = 'http://localhost:50599/Student/Comment/'+tutorialID;
                var data = {
                    comment: document.getElementById('com').value,
                    sID: localStorage.getItem('UserID'),
                };

                axios.put(URL,data,{headers: {
                    'ApiKey': Key
                     }}).then(y=>
                     {



                        var data = {
                            user : localStorage.getItem('User'),
                            uid : localStorage.getItem('UserID'),
                        }
                
                        var URL = 'http://localhost:50599/Home/WatchTutorial/'+urlParams.get('tid')+'/'+urlParams.get('teid');
                
                        axios.post(URL,data,{headers: {
                            'ApiKey': Key
                             }}).then(x=> 
                            {
                                this.StudentAllComments(x.data.data.studentComment);
                                this.setState({totalStudentComment:x.data.data.studentComment.length });
                            });



                     }
                     );
            }
            else if(user=='Teacher')
            {

                var URL = 'http://localhost:50599/Teacher/Comment/'+tutorialID;
                var data = {
                    comment: document.getElementById('com').value,
                    teID: localStorage.getItem('UserID'),
                };

                axios.put(URL,data,{headers: {
                    'ApiKey': Key
                     }}).then(y=>
                     {



                        var data = {
                            user : localStorage.getItem('User'),
                            uid : localStorage.getItem('UserID'),
                        }
                
                        var URL = 'http://localhost:50599/Home/WatchTutorial/'+urlParams.get('tid')+'/'+urlParams.get('teid');
                
                        axios.post(URL,data,{headers: {
                            'ApiKey': Key
                             }}).then(x=> 
                            {
                                this.TeacherAllComments(x.data.data.teacherComment);
                                this.setState({totalTeacherComment:x.data.data.teacherComment.length });
                            });



                     }
                     );

            }
      }

      Comment = (e) =>{
          if(e=='Student'){
           this.setState({visibleTeacherComment:'none'});
           this.setState({visibleStudentComment:'inline'});
          }
          if(e=='Teacher'){
            this.setState({visibleStudentComment:'none'});
            this.setState({visibleTeacherComment:'inline'});
           }
      }

      Like = (vote) =>{

        var queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);  

        var rate = 0;  
        if(vote=='up'){
            rate = 1;
        }
        else if(vote=='down'){
            rate = -1;
        }

        var user = localStorage.getItem('User');
       
        var URL = '';

       

        if(user == 'Student'){
            URL = 'http://localhost:50599/Student/Reaction';
           

        }
        else if (user == 'Teacher')
        {
            URL = 'http://localhost:50599/Teacher/Reaction';
        }

        var data = {
            tID : Number(urlParams.get('tid')),
            reaction: rate,
            uid : Number(localStorage.getItem('UserID')),
        };
        
       

        axios.post(URL,data,{headers: {
            'ApiKey': Key
             }}).then(y=> 
             {


                console.log("After react: "+y);

                var URL1 = 'http://localhost:50599/Home/WatchTutorial/'+urlParams.get('tid')+'/'+urlParams.get('teid');
                
                console.log("Watch URL: "+URL1);

                axios.post(URL1,data,{headers: {
                    'ApiKey': Key
                     }}).then(x=> 
                    {
                        var StudentLike = 0;
                        var TeacherLike = 0;
                        var StudentDisLike = 0;
                        var TeacherDisLike = 0;

                        x.data.data.studentLike.forEach(element => {
                            if(element.reactionName==1){
                                StudentLike += element.totalReaction;
                            }
                            else if(element.reactionName==-1){
                                StudentDisLike += element.totalReaction;
                            }
                        });
     
                        x.data.data.teacherLike.forEach(element => {
                         if(element.reactionName==1){
                             TeacherLike += element.totalReaction;
                         }
                         else if(element.reactionName==-1){
                             TeacherDisLike += element.totalReaction;
                         }
                         });

                         this.setState({Like:(StudentLike+TeacherLike)});
                         this.setState({DisLike:(StudentDisLike+TeacherDisLike)});
                    });







             }
             );

      }

      render(){

          const StudentCommentStyle = {
            display : this.state.visibleStudentComment,
          }
          const TeacherCommentStyle = {
            display : this.state.visibleTeacherComment,
          }

            return(
                <div> 
                   
                    {this.state.element}

                    <div className='container'>
                        <div className='row'>
                            {this.state.Navbar}

                            <section id="courses">

                                <div className="container">
                                    <div className="row">

                                        <div className="col-md-12 col-sm-12">
                                            <div className="section-title">
                                                <h2> {this.state.tutorialTitle} 
                                                <small> {this.state.tutorialDescription} 
                                                </small>
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="feature-thumb">
                                            {this.state.tutorialProperty}
                                                <button className="like" onClick={() => this.Like('up')} >
                                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                                </button> ({this.state.Like}) &nbsp; 

                                                <button className="dislike" onClick={() => this.Like('down')}>
                                                    <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                                </button> ({this.state.DisLike}) &nbsp;  <br/> <br/>
                                            <a className='point' onClick={() => this.Comment('Student')}> Student Comments ({this.state.totalStudentComment}) </a> 
                                            &nbsp; &nbsp; <a className='point'  onClick={() => this.Comment('Teacher')}> Teacher Comments ({this.state.totalTeacherComment})  </a>
                                            <div>
                                            {this.state.MyComment} 
                                            </div>
                                            <div style={StudentCommentStyle}>
                                               {this.state.studentComment}
                                            </div>
                                            <div style={TeacherCommentStyle}>
                                               {this.state.teacherComment}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                         
                                   
                           

                        </div>
                    </div>
                 </div>
            )
      }
}