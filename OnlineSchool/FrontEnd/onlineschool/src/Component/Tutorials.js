import React,{Component} from 'react'
import { Redirect } from 'react-router';
import {Navbar} from './Navbar'
import {Key} from './KeyFile'
import {Link} from 'react-router-dom'
import './component.css'
import axios from 'axios';

export class Tutorial extends Component{

       constructor(props){
           super(props);
           var queryString =  window.location.search;
           const urlParams = new URLSearchParams(queryString);
           console.log(urlParams.get('cid'));
           this.state = {
               cid : urlParams.get('cid'),
               Content :[],
               like_ratio : 0,
               admin_GetsLikeRatio : [],
           }

           
       } 

       HideVideo = (teID , adid , Hide) => {


           var URL =  "";

           if(!Hide){
            URL =  "http://localhost:50599/Admin/HideVideo/"+teID+"/"+adid;
           }
           else{
            URL = "http://localhost:50599/Admin/UnHideVideo/"+teID+"/"+adid;
           }


           var data = [];

           axios.put(URL,data,{headers: {
            'ApiKey': Key
            }}) .then(
                res => {
                   window.location.reload(res.success);
                }
            );
       }

       componentDidMount(){
        var queryString =  window.location.search;
        const urlParams = new URLSearchParams(queryString);

        var store = localStorage.getItem('UserID');
        var user = localStorage.getItem('User');

        var UrlString = "";

        if(user == "Admin"){
            UrlString = "http://localhost:50599/Admin/TutorialLikeRatio/"+store;
        }
        else{
            UrlString  = "http://localhost:50599/Home/Tutorials/"+urlParams.get('cid');
        }
      
        var element = [];

        fetch(UrlString,

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
                console.log(data);
               if(data.data!='NO DATA'){
               for(var i=0;i<data.data.length;i++)
               {

                    var Video = 'http://localhost:50599/Tutorial/'+data.data[i].video_Path;
                    var Pathto = '/WatchTutorial?tid='+data.data[i].tid+'&teid='+data.data[i].teID;

                    var tutorialID = data.data[i].teID;

                    var adminLikeRatio = [];

                    var Hide = true;

                    if(data.data[i].hideOrUnHide > 0){
                            Hide = false;
                    }

                    if(data.data[i].like_Ratio > 0 && user=="Admin"){
                        adminLikeRatio.push(

                            <div>

                                <button className="like">
                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                </button> ({data.data[i].like_Ratio})   &nbsp;  <br /> <br />

                               

                            </div>

                        );
                    }

                    else if(data.data[i].like_Ratio < 0 && user=="Admin"){
                        adminLikeRatio.push(

                            <div>
                                <button className="dislike">
                                    <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                </button> ({data.data[i].like_Ratio *(-1)}) &nbsp;  <br /> <br />
                                
                                <button onClick = {() => this.HideVideo(tutorialID,store,Hide)}>  {Hide? 'UnHide This Video' : 'Hide This Video'}  </button>

                             </div>

                        );
                    }

                    else if(data.data[i].like_Ratio == 0 && user=="Admin"){
                        adminLikeRatio.push(

                            <div>
                                   <h6> Neutral Reaction ({data.data[i].like_Ratio})  </h6> 
                            </div>

                          );
                    }

                    element.push
                    (
                        <div className="col-md-4 col-sm-4">
                        <div className="feature-thumb">
                        <video width='250px' height='250px' className="img-responsive" controls autoPlay muted>
                        <source src={Video} type="video/mp4"  />
                       </video>
                          

                            <h3>Teacher Name: {data.data[i].teacher_Name}</h3>
                            <h5>Tutorial Title: {data.data[i].tutorial_Title}</h5>
                            <p>{data.data[i].tutorial_Description}</p>
                             {adminLikeRatio}
                            <Link to={Pathto} > more </Link>  
                        </div>
                       
                        </div>
                    )
               }
               }
               this.setState({Content:element});
            }
            
        )



       }

       

       render(){

          


           if(this.state.cid==null || this.state.cid==''){
               console.log(this.state.cid);
               return <Redirect to='/' />
           } 

           return (
               <div className='container'>
                   <div className='row'>
                       <Navbar/>

                <section id="courses">
                   
                   <div className="container">
                       <div className="row">
                      
                           <div className="col-md-12 col-sm-12">
                               <div className="section-title">
                                   <h2> Welcome <small> Enjoy The Tutorials </small></h2>
                               </div>
                           </div>
                           {this.state.Content}
                       </div>   
                   </div>
               </section>

                    </div>
             </div>
           )
       }
}