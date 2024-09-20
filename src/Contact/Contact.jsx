import React from 'react'
import './Contact.css'

const Contact = () => {
    return (
        <div>
            <section className='contact'>
                <div className='content'>
                    <h2>Contact Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusond
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                </div>
                <div className='container2'>
                    <div className='contactInfo'>
                        <div className='box'>
                            <div className='icon'><b></b><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                            <div className='text'>
                                <h3>Address</h3>
                                <p>Ambedkar Nagar Uttar Pradesh</p>

                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'><b></b><i className="fa fa-phone" aria-hidden="true"></i></div>
                            <div className='text'>
                                <h3>Phone</h3>
                                <p>+919616560773</p>

                            </div>
                        </div>
                        <div className='box'>
                            <div className='icon'><b></b><i className="fa fa-envelope" aria-hidden="true"></i></div>
                            <div className='text'>
                                <h3>Gmail</h3>
                                <p>av96165607@gmail.com</p>

                            </div>
                        </div>
                        <h2 className='txt'>Contact with us </h2>
                        <ul className='sci'>
                            <li><a href='!'><i className='fa-brands fa-facebook-f'></i></a></li>
                            <li><a href='!'><i className='fa-brands fa-x'></i></a></li>
                            <li><a href='!'><i className='fa-brands fa-instagram'></i></a></li>
                            <li><a href='!'><i className='fa-brands fa-linkedin-in'></i></a></li>

                        </ul>
                    </div>
                    <div className='contactForm'>
                        <form>
                            <h2>Send Message</h2>
                            <div className='inputBox'>
                                <input type="text" name="" required="required" />
                                <span>Full Name</span>
                            </div>
                            <div className='inputBox'>
                                <input type="text" name="" required="required" />
                                <span>Gmail</span>
                            </div>
                            <div className='inputBox'>
                                <input type="text" name="" required="required" />
                                <span>Type your Message...</span>
                            </div>
                            <div className='inputBox'>
                                <input type='submit' name='' value='Send' />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact