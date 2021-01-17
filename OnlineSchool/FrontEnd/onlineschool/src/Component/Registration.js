import React,{Component} from 'react'
import axios from 'axios';
import {Key} from './KeyFile'
export class Registration extends Component{

    constructor(props){
        super(props);

        this.state={
            element : '',
            Message : ''
        }
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

        Register = async () => {


            const file = document.querySelector('#img').files[0];
            var FileToBase64 = await this.toBase64(file);

            var data = {
                name : document.getElementById('fullname').value,
                email : document.getElementById('email').value,
                phone :  document.getElementById('number').value,
                address :  document.getElementById('address').value,
                password :  document.getElementById('password').value,
                photo : FileToBase64.split(',')[1],
                cV: '',
            };
           
            var user = document.getElementById('user').value;

            var URL ='';

            if(user=='Student')
            {

            URL = 'http://localhost:50599/Student/Registration';
         
            }
            else if(user=='Teacher')
            {
                const fileCV = document.querySelector('#cv').files[0];
                var FileToBase64forCV = await this.toBase64(fileCV);
                data.cV = FileToBase64forCV.split(',')[1];
                URL = 'http://localhost:50599/Teacher/Registration';
            }


            axios.post(URL,data,{headers: {
                'ApiKey': Key
              }}).then(x=> this.setState({Message:  x.data.data }));
            //.then(response => this.setState({ success: response.success+"" }));
        }

        CVUpload = () => 
        {
            var user = document.getElementById('user').value;
            if(user=='Teacher'){
                this.setState({element : 

                    <div className="form-group">
                    <label for="img" className="col-sm-3 control-label">Select Resume:</label>
                    <div className="col-sm-4">
                        <input type="file" id="cv" name="img" accept="application/pdf"  className="form-control"/>
                    </div>
                   </div>
                 
                
                });
            }
            else{
                this.setState({element:''});
            }
        }
       
        render(){
            return(
             <section id="testimonial">

                <div className="container">
                 <div className="form-horizontal" >
                     <h2>Registration Form</h2>
                     <div className="form-group">
                         <label for="fullname" className="col-sm-3 control-label">Full Name</label>
                         <div className="col-sm-9">
                             <input type="text" name="name" id="fullname" placeholder="Full Name"  className="form-control" autofocus/>
                             <span className="help-block"> First Name, Last Name, eg.:  Smith Harry</span>
                         </div>
                     </div>
                 
                     <div className="form-group">
                         <label for="email" className="col-sm-3 control-label">Email</label>
                         <div className="col-sm-9">
                             <input type="email" name="mail" id="email" placeholder="Email"  className="form-control" />
                         </div>
                     </div>
                     
            
                     
            
            
                     <div className="form-group">
                         <label for="phonenumber" className="col-sm-3 control-label">Phone Number</label>
                         <div className="col-sm-9">
                             <input type="text" name="phnNum" id="number" placeholder="Phoner Number" className="form-control"/>
                         </div>
                     </div>
            
            
                    
                         
            
                     <div className="form-group">
                         <label for="address" className="col-sm-3 control-label">Address</label>
                         <div className="col-sm-9">
                             <input type="text" name="Address"  id="address" placeholder="Enter Present Address"  className="form-control"/>
                         </div>
                     </div>
            
            
                    
                     
            
                     
                     <div className="form-group" onChange={() => this.CVUpload()}>
                         <label for="user" className="col-sm-3 control-label">User</label>
                         <div className="col-sm-9">
                             <select name="User" id="user" className="form-control">
            
                                 <option value="Student">Student</option>
                                 <option value="Teacher">Teacher</option>

                             </select>
                         </div>
                     </div> 
                                     
                                     
            
            
            
            
            
                   
                     <div className="form-group">
                         <label for="password" className="col-sm-3 control-label">Password</label>
                         <div className="col-sm-9">
                             <input type="password" id='password'  placeholder="password"  className="form-control"/>
                         </div>
                     </div>
                        
            
            
            
                     <div className="form-group">
                      <label for="img" className="col-sm-3 control-label">Select Profile Picture:</label>
                      <div className="col-sm-4">
                          <input type="file" id="img" name="img" accept="image/*" className="form-control"/>
                      </div>
                     </div>
                   


                     {this.state.element}
                  
            
            
                  
                        
                     <div className="form-group">
                         <div className="col-sm-9 col-sm-offset-3">
                             <button type="submit" className="btn btn-primary btn-block" onClick={() => this.Register()}>Registration</button>
                         </div>
                     </div>

                     <h4> {this.state.Message}  </h4>
                        
                </div>
             </div> 

             
            
             </section> 

             
            )
        }

}