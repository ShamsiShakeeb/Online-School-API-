import React,{Component} from  'react'
import {Key} from './KeyFile'
import {Navbar} from './Navbar'
import {Courses} from './Courses'
import { Redirect } from 'react-router'

export class Student extends Component{

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
                   
                
               
            }

        }

        async componentDidMount()
        {
          
           var store = localStorage.getItem('UserID');
           console.log(store);

           fetch('http://localhost:50599/Student/Profile/'+this.state.authorization , 
            
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
                 this.setState({userIMG: 'http://localhost:50599/AdminProfilePicture/'+data.data.profile_Image_Path})
             }
           )
            
        }

        render(){

            if(this.state.authorization =='undefined'){
                return <Redirect to='/' />
            }
            if(this.state.User!='Student'){
                return <Redirect to='/' />
            }

            return(
                <div className="container">
                <div className="row">
                   <Navbar page="StudentPage"/>
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
                   <Courses  page="HomePage" />
                 </div>
                 </div>
            )
        }

}