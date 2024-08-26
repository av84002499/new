import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <div>

            <header id="mainslider" className="masthead">
                <div className="banner-shape">
                    <svg className="shape-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#fff" fill-opacity="1"
                            d="M0,224L34.3,213.3C68.6,203,137,181,206,154.7C274.3,128,343,96,411,122.7C480,149,549,235,617,245.3C685.7,256,754,192,823,186.7C891.4,181,960,235,1029,256C1097.1,277,1166,267,1234,218.7C1302.9,171,1371,85,1406,42.7L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                        </path>
                    </svg>
                </div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="slider-overlay"></div>
                            <img src="../images/slider-1.jpg" className="d-block w-100" alt="slider" />
                            <div className="carousel-caption d-flex flex-column flex-lg-row align-items-center">
                                <div className="b-flip-text">
                                    <div className="flip-text">
                                        <h1>Discover. Create. Share. QuickCatalog – Your Ultimate Catalog Companion!</h1>
                                    </div>
                                    <div className="flip-text">
                                        <p>The easiest & most efficient way to manage your menu by E-Menu</p>
                                    </div>
                                </div>
                                <div className="b-flip-image">
                                    <img className="img-fluid" src="../images/b-img1.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="slider-overlay"></div>
                            <img src="../images/slider-2.jpg" className="d-block w-100" alt="slider" />
                            <div className="carousel-caption d-flex flex-column flex-lg-row align-items-center">
                                <div className="b-flip-text">
                                    <div className="flip-text">
                                        <h1>QuickCatalog: Your Shortcut to Stunning Menus Anytime, Anywhere!</h1>
                                    </div>
                                    <div className="flip-text">
                                        <p>Create your digital menus quickly and easily with QR code, customers view the menu on their own device</p>
                                    </div>
                                </div>
                                <div className="b-flip-image">
                                    <img className="img-fluid" src="../images/b-img1.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="slider-overlay"></div>
                            <img src="../images/slider-3.jpg" className="d-block w-100" alt="slider" />
                            <div className="carousel-caption d-flex flex-column flex-lg-row align-items-center">
                                <div className="b-flip-text">
                                    <div className="flip-text">
                                        <h1>Empower Your Brand with QuickCatalog – Fast, Fresh, Found!</h1>
                                    </div>
                                    <div className="flip-text">
                                        <p>A E-Menu allows restaurant users to access the menu on their smartphones by simply scanning a QR code.</p>
                                    </div>
                                </div>
                                <div className="b-flip-image">
                                    <img className="img-fluid" src="../images/b-img1.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="slider-overlay"></div>
                            <img src="../images/slider-4.jpg" className="d-block w-100" alt="slider" />
                            <div className="carousel-caption d-flex flex-column flex-lg-row align-items-center">
                                <div className="b-flip-text">
                                    <div className="flip-text">
                                        <h1>Fast Track Your Listings with QuickCatalog!</h1>
                                    </div>
                                    <div className="flip-text">
                                        <p>The easiest & most efficient way to manage your menu by E-Menu</p>
                                    </div>
                                </div>
                                <div className="b-flip-image">
                                    <img className="img-fluid" src="../images/b-img1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </header>

            <section className="aboutus-section">
                <div className="container">
                    <div className="row text-center mb-4">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2>Your menu as a QR-Code</h2>
                                <p>Access our menu digitally via QR code using any smartphone or tablet. Scan the QR code provided to enjoy the benefits of a hygienic and user-friendly experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                            <div className="about-content-box">
                                <div className="about-label">
                                    <span className="about-label-line"></span>
                                    <span className="about-label-text">Step</span>
                                </div>
                                <h2>Open scanner in your phone</h2>
                                <span className="shadow-background-text">01</span>
                                <p>Choose an Android or iOS device, access a scanning app. Phones have built-in QR scanners; alternatively, get a third-party QR code app from the app store. Use the phone camera to scan QR codes.</p>
                            </div>
                            <div className="about-content-box">
                                <div className="about-label">
                                    <span className="about-label-line"></span>
                                    <span className="about-label-text">Step</span>
                                </div>
                                <h2>Scan QR code</h2>
                                <span className="shadow-background-text">02</span>
                                <p>Open the scanner app, scan the business's QR code with your phone's camera. QR codes store data and, when used with a compatible app, can link to webpages, contacts, or perform diverse actions.</p>
                            </div>
                            <div className="about-content-box mb-0">
                                <div className="about-label">
                                    <span className="about-label-line"></span>
                                    <span className="about-label-text">Step</span>
                                </div>
                                <h2>Get the QuickCatalog</h2>
                                <span className="shadow-background-text">03</span>
                                <p>Scanning the QR code navigates to the business's QuickCatalog—a mobile-friendly digital list showcasing items or services. It enables convenient browsing with descriptions, prices, images, and supplementary information links.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="industry-images-slider">
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="../images/about-image-2.png" className="img-fluid" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="../images/about-image.png" className="img-fluid" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="../images/about-image-1.png" className="img-fluid" alt="..." />
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="download-section">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-md-6">
                            <div className="download-content">
                                <h2 className="">Enhancing Customer Interaction: Digital Menu Solutions for Businesses</h2>
                                <p className="">Our product streamlines menu or list card automation for businesses, ensuring an effortless transition to user-friendly digital formats. This innovation enhances customer experiences, fostering business growth. By simply inputting their offerings into our platform, businesses generate a QR-accessible digital menu, eliminating physical cards for improved hygiene. This modern approach captivates customers with detailed information, vivid visuals, and potential interactive elements. Embracing this technology not only meets evolving consumer preferences but also portrays businesses as innovative. This shift can drive increased customer satisfaction, repeat visits, and a competitive edge. Our solution empowers businesses to adapt, elevate experiences, and thrive in today's digital landscape</p>
                                <p className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book.</p>
                                <a className="btn theme-btn btn-style-one mt-md-4 mt-2" href="!">Click Here to Find Out!</a>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="download-img text-center">
                                <picture>
                                    <img src="../images/about-image2.png" className="img-fluid" alt="about-img" />
                                </picture>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="qr-section">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Image section */}
                        <div className="col-md-6 text-center text-md-right">
                            <figure>
                                <img src="../images/demo-qr.png" alt="Demo QR" className="img-fluid" />
                                <figcaption className="mt-2">Demo QR</figcaption>
                            </figure>
                        </div>

                        {/* Text and features section */}
                        <div className="col-md-6">
                            <h2 className="text-center text-md-left">The QR-Code</h2>
                            <p className="lead mb-4">
                                You can create one or more QR codes for each Business. It contains the
                                menu that you have created in the Business portal. The code stays the same regardless of how
                                often you change the menu. You also have the option of customizing the QR code with your logo or
                                your preferred colors.
                            </p>
                            <ul className="list-unstyled">
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-2">
                                            <div className="featureCircle">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="lead mb-0">QR-Code always stays the same</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-2">
                                            <div className="featureCircle">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="lead mb-0">Customizable Design (Color / Logo)</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-2">
                                            <div className="featureCircle">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="lead mb-0">Stickers &amp; Table displays for your Business</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Home