import React, {Component} from 'react'
import '../bootstrap.css'
import '../font-awesome.min.css'
import '../owl.carousel.css'
import '../owl.theme.default.min.css'
import '../templatemo-style.css'
import {Registration} from './Registration'
import {Login} from './Login'
import {Navbar} from './Navbar'
import {Courses} from './Courses'
export class Home extends Component{

        constructor(props){
            super(props);
               
            this.state={

            }
        }

        render(){
            return (

                

              

<body id="top" data-spy="scroll" data-target=".navbar-collapse" data-offset="50">
    

    
     <section className="preloader">
          <div className="spinner">

               <span className="spinner-rotate"></span>
               
          </div>
     </section>

     <Navbar page = "HomePage"/>

     <Courses page = "HomePage"/>
   
     <Registration/>

    
     <section id="about">
          <div className="container">
               <div className="row">

                    <div className="col-md-6 col-sm-12">
                         <div className="about-info">
                              <h2>Start your journey for a better life with Online School</h2>

                              <figure>
                                   <span><i className="fa fa-users"></i></span>
                                   <figcaption>
                                        <h3>Qualified Teachers</h3>
                                        <p>Every courses are controlled by qualified teachers.</p>
                                   </figcaption>
                              </figure>

                              <figure>
                                   <span><i className="fa fa-certificate"></i></span>
                                   <figcaption>
                                        <h3>Huge course library </h3>
                                        <p>We offer many courses from this you can choose whatever you like.</p>
                                   </figcaption>
                              </figure>

                              <figure>
                                   <span><i className="fa fa-bar-chart-o"></i></span>
                                   <figcaption>
                                        <h3>Free of cost</h3>
                                        <p>There is no charge fou any courses. It's totally free.</p>
                                   </figcaption>
                              </figure>
                         </div>
                    </div>

                    <Login />

               </div>
          </div>
     </section>


   
     <section id="team">
          <div className="container">
               <div className="row">

                    <div className="col-md-12 col-sm-12">
                         <div className="section-title">
                              <h2>Teachers <small>Meet Professional Trainers</small></h2>
                         </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                         <div className="team-thumb">
                              <div className="team-image">
                                   <img src="images/author-image1.jpg" className="img-responsive" alt=""/>
                              </div>
                              <div className="team-info">
                                   <h3>Mark Wilson</h3>
                                   <span>I love Teaching</span>
                              </div>
                              <ul className="social-icon">
                                   <li><a href="#" className="fa fa-facebook-square" attr="facebook icon"></a></li>
                                   <li><a href="#" className="fa fa-twitter"></a></li>
                                   <li><a href="#" className="fa fa-instagram"></a></li>
                              </ul>
                         </div>
                    </div>
                   

                    <div className="col-md-3 col-sm-6">
                         <div className="team-thumb">
                              <div className="team-image">
                                   <img src="images/author-image2.jpg" className="img-responsive" alt=""/>
                              </div>
                              <div className="team-info">
                                   <h3>Catherine</h3>
                                   <span>Education is the key!</span>
                              </div>
                              <ul className="social-icon">
                                   <li><a href="#" className="fa fa-google"></a></li>
                                   <li><a href="#" className="fa fa-instagram"></a></li>
                              </ul>
                         </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                         <div className="team-thumb">
                              <div className="team-image">
                                   <img src="images/author-image3.jpg" className="img-responsive" alt=""/>
                              </div>
                              <div className="team-info">
                                   <h3>Jessie Ca</h3>
                                   <span>I like Online Courses</span>
                              </div>
                              <ul className="social-icon">
                                   <li><a href="#" className="fa fa-twitter"></a></li>
                                   <li><a href="#" className="fa fa-envelope-o"></a></li>
                                   <li><a href="#" className="fa fa-linkedin"></a></li>
                              </ul>
                         </div>
                    </div>

                    <div className="col-md-3 col-sm-6">
                         <div className="team-thumb">
                              <div className="team-image">
                                   <img src="images/author-image4.jpg" className="img-responsive" alt=""/>
                              </div>
                              <div className="team-info">
                                   <h3>Andrew Berti</h3>
                                   <span>Learning is fun</span>
                              </div>
                              <ul className="social-icon">
                                   <li><a href="#" className="fa fa-twitter"></a></li>
                                   <li><a href="#" className="fa fa-google"></a></li>
                                   <li><a href="#" className="fa fa-behance"></a></li>
                              </ul>
                         </div>
                    </div>

                    

               </div>
          </div>
     </section>



     <section id="contact">
          <div className="container">
               <div className="row">

                    <div className="col-md-6 col-sm-12">
                         <form id="contact-form" role="form" action="" method="post">
                              <div className="section-title">
                                   <h2>Contact us <small>we love conversations. Let's talk!</small></h2>
                              </div>

                              <div className="col-md-12 col-sm-12">
                                   <input type="text" className="form-control" placeholder="Enter full name" name="name" required=""/>
                    
                                   <input type="email" className="form-control" placeholder="Enter email address" name="email" required=""/>

                                   <textarea className="form-control" rows="6" placeholder="Tell us about your message" name="message" required=""></textarea>
                              </div>

                              <div className="col-md-4 col-sm-12">
                                   <input type="submit" className="form-control" name="send message" value="Send Message"/>
                              </div>

                         </form>
                    </div>

                    <div className="col-md-6 col-sm-12">
                         <div className="contact-image">
                              <img src="images/contact-image.jpg" className="img-responsive" alt="Smiling Two Girls"/>
                         </div>
                    </div>

               </div>
          </div>
     </section>       


    
     <footer id="footer">
          <div className="container">
               <div className="row">

                    <div className="col-md-4 col-sm-6">
                         <div className="footer-info">
                              <div className="section-title">
                                   <h2>Headquarter</h2>
                              </div>
                              <address>
                                   <p>1800 dapibus a tortor pretium,<br/> Integer nisl dui, ABC 12000</p>
                              </address>

                              <ul className="social-icon">
                                   <li><a href="#" className="fa fa-facebook-square" attr="facebook icon"></a></li>
                                   <li><a href="#" className="fa fa-twitter"></a></li>
                                   <li><a href="#" className="fa fa-instagram"></a></li>
                              </ul>

                              <div className="copyright-text"> 
                                   <p>Copyright &copy; 2019 Company Name</p>
                                   
                                   <p>Design: TemplateMo</p>
                              </div>
                         </div>
                    </div>

                    <div className="col-md-4 col-sm-6">
                         <div className="footer-info">
                              <div className="section-title">
                                   <h2>Contact Info</h2>
                              </div>
                              <address>
                                   <p>+65 2244 1100, +66 1800 1100</p>
                                   <p><a href="mailto:youremail.co">hello@youremail.co</a></p>
                              </address>

                              <div className="footer_menu">
                                   <h2>Quick Links</h2>
                                   <ul>
                                        <li><a href="#">Career</a></li>
                                        <li><a href="#">Investor</a></li>
                                        <li><a href="#">Terms & Conditions</a></li>
                                        <li><a href="#">Refund Policy</a></li>
                                   </ul>
                              </div>
                         </div>
                    </div>

                    <div className="col-md-4 col-sm-12">
                         <div className="footer-info newsletter-form">
                              <div className="section-title">
                                   <h2>Newsletter Signup</h2>
                              </div>
                              <div>
                                   <div className="form-group">
                                        <form action="#" method="get">
                                             <input type="email" className="form-control" placeholder="Enter your email" name="email" id="email" required=""/>
                                             <input type="submit" className="form-control" name="submit" id="form-submit" value="Send me"/>
                                        </form>
                                        <span><sup>*</sup> Please note - we do not spam your email.</span>
                                   </div>
                              </div>
                         </div>
                    </div>      
               </div>
          </div>      
     </footer>
</body>
                  

            )
        }
}