import React, {Component} from 'react'
import './component.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import {Key} from './KeyFile'
export class AddNewTutorial extends Component{

    constructor(props){
        super(props);

        this.state=
        {
            Message:'',
        }
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    AddTutorial = async () =>
    {
        const file = document.querySelector('#TutorialVideo').files[0];
        var FileToBase64 = await this.toBase64(file);
        console.log(FileToBase64);

        var fileType = FileToBase64.split(',')[0].split('/');
    
        var tutorial = {
            teId : localStorage.getItem('UserID'),
            title: document.getElementById('VideoTitle').value ,
            description:  document.getElementById('VideoDescription').value ,
            video : FileToBase64.split(',')[1],
            videoType : fileType[1].split(';')[0],
        };

        console.log(tutorial);

        var queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);

        var URL = 'http://localhost:50599/Teacher/UploadTutorial/'+urlParams.get('cid');

          axios.post(URL,tutorial,{headers: {
            'ApiKey': Key
          }}).then(x=> this.setState({Message:  x.data.data }));
    }

      render(){
           
           const AddTutorialView = () =>
           {

            var item = [];
            if(this.props.CourseId!=null)
            {
            item.push
            (
                
            <section id="testimonial">
            <Link to='/TeacherProfile' class="close"></Link>
            <div className="container">
               <div className="form-horizontal" >
                   <h2>Create Tutorial</h2>
                   <div className="form-group">
                       <label for="fullname" className="col-sm-3 control-label">Tutorial Title</label>
                       <div className="col-sm-9">
                           <input type="text" name="name" id="VideoTitle" placeholder="Tutorial Title" className="form-control" autofocus />
                       </div>
                   </div>

                   <div className="form-group">
                       <label for="email" className="col-sm-3 control-label">Tutorial Description</label>
                       <div className="col-sm-9">
                           <input type="textarea" name="mail" id="VideoDescription" placeholder="Tutorial Description" className="form-control" />
                       </div>
                   </div>


                   <div className="form-group">
                       <label for="img" className="col-sm-3 control-label">Select Video:</label>
                       <div className="col-sm-4">
                           <input type="file" id="TutorialVideo" name="img" accept="video/mp4,video/x-m4v,video/*" className="form-control" />
                           <br/>
                          
                       </div>
                   </div>


                   <div className="form-group">
                       <div className="col-sm-9 col-sm-offset-3">
                           <button onClick={() => this.AddTutorial()} className="btn btn-primary btn-block">Create Tutorial</button>
                           {this.state.Message}
                       </div>
                   </div>



               </div>
             </div>

              </section> 
           
            );
            }
            else
            {
                item.push(<div></div>);
            }

             return (item);

             }
           
           
           
            return (
               AddTutorialView()
            )
        }
}