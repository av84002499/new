import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from './Products.js';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import {QRCodeCanvas} from 'qrcode.react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Loader from '../Loader.jsx';
// import './Navbar2.css'

const Userprofile = (props) => {
  const navigate = useNavigate();
  const [shopdtl, setShopdtl] = useState(null);
  const [loading, setLoading] = useState(false)


  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    const qrCodeNode = qrCodeRef.current;

    html2canvas(qrCodeNode).then((canvas) => {
      canvas.toBlob((blob) => {
        const userName = props.userLogged().name; // Assuming props.userLogged() returns an object with a 'name' property

        saveAs(blob, `${userName}_qrcode.png`); // Save the image with the user's name as part of the filename
      });
    });
  }




  const getShopdtls = useCallback(async () => {
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/Signin');
      return;
    }

    try {
      setLoading(true)
      const formData = { 'userId': userId };
      const response = await fetch('https://quickcatalog.online/api/userdata/getuserdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": props.userLogged().token,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert('Failed to load!!');
        navigate('/Signin');
        return;
      }
      try {
        const responseData = await response.json();
        setShopdtl(responseData);
      }
      catch {
        console.log('Something went wrong!!');
        return;
      }
    }
    catch (error) {
      console.error('Error loading details:', error.message);
      alert(error.message);
    } finally{
      setLoading(false)
    }
  }, [props, navigate]);

  if (shopdtl) {
    document.getElementById('shopname').value = shopdtl.shopname;
    document.getElementById('address').value = shopdtl.address;
    document.getElementById('category').value = shopdtl.category;
    document.getElementById('fcinumber').value = shopdtl.fcinumber;
    document.getElementById('phonenumber1').value = shopdtl.phonenumber1;
    document.getElementById('phonenumber2').value = shopdtl.phonenumber2;
    document.getElementById('gstnumber').value = shopdtl.gstnumber;
    document.getElementById('aadharnumber').value = shopdtl.aadharnumber;
    var img = document.getElementById('profimg');
    img.src = 'https://quickcatalog.online/uploads/' + shopdtl.imageUrl;
    img.height = 450;
    img.width = 400;

  }

  const saveShopdtls = async (event) => {
    event.preventDefault();
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/Signin');
      return;
    }
    // const form = document.getElementById('shopdtl');
    const shopname = document.getElementById('shopname').value;
    const address = document.getElementById('address').value;
    const category = document.getElementById('category').value;
    const fcinumber = document.getElementById('fcinumber').value;
    const phonenumber1 = document.getElementById('phonenumber1').value;
    const phonenumber2 = document.getElementById('phonenumber2').value;
    const gstnumber = document.getElementById('gstnumber').value;
    const aadharnumber = document.getElementById('aadharnumber').value;
    const formData = { shopname: shopname, address: address, category: category, fcinumber: fcinumber, phonenumber1: phonenumber1, phonenumber2: phonenumber2, gstnumber: gstnumber, aadharnumber: aadharnumber, userId: userId };

    // console.log(formData);
    try {
      setLoading(true)
      const response = await fetch('https://quickcatalog.online/api/userdata/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": props.userLogged().token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log('Failed to Save!!');
        return;
      }
      try {
        const responseData = await response.json();
        console.log(responseData);
        Swal.fire({
          icon: 'success',
          title: 'Details updated successfully!',
          showConfirmButton: false,
          timer: 3000, // 3 seconds
        });
        getShopdtls();
      }
      catch {
        console.log('Something went wrong!!');
      }
    }
    catch (error) {
      console.error('Error saving details:', error.message);
      alert(error.message);
    } finally{
      setLoading(false)
    }
  };

  const saveimageurl = async (event) => {
    event.preventDefault();
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/Signin');
      return;
    }
    try {
      setLoading(true)
      const formDataToSend = new FormData(event.target);
      formDataToSend.append('userId', userId);

      const response = await fetch('https://quickcatalog.online/api/imagurl/shopimg', {
        method: 'POST',
        headers: {
          "Authorization": props.userLogged().token,
        },
        body: formDataToSend,
      });
      if (!response.ok) {
        console.log('Failed to Save!!');
        return;
      }
      try {
        const responseData = await response.json();
        console.log(responseData);
        Swal.fire({
          icon: 'success',
          title: 'Details updated successfully!',
          showConfirmButton: false,
          timer: 3000, // 3 seconds
        });
        getShopdtls();
      } catch {
        console.log('Something went wrong!!');
      }
    } catch (error) {
      console.error('Error saving details:', error.message);
      alert(error.message);
    } finally{
      setLoading(false)
    }
  };




  const logoutUser = async () => {
    props.logoutUser();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out successfully!',
      showConfirmButton: false,
      timer: 3000, // 3 seconds
    });
    navigate('/Home');
    return;
  }
  useEffect(() => {
    getShopdtls();
  }, [getShopdtls]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href='/'>
            <img src="./images/logo-black.png" alt="Logo" width="200" height="40" className="d-inline-block align-text-top me-2 " />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <h5 className="me-3 text-white">Welcome, {props.userLogged().name}</h5>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-info me-2 rounded-pill float-end" data-bs-toggle="modal" data-bs-target="#qrModal">
                  Generator qr code
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-danger rounded-pill float-end" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="card shadow" style={{ maxWidth: '80vw', margin: 'auto', marginTop: '7rem', marginBottom: '3rem' }}>
        <div className="card-header text-center text-white" style={{ backgroundColor: '#2a5c99' }}>
          <h2 className="tm-hero-title mb-0 position-relative">
            Profile
            <button type="button" className="btn position-absolute top-0 end-0 p-1 text-white" data-bs-toggle="modal" data-bs-target="#qrModal"><i className="bi bi-upc-scan"> QR</i></button>

          </h2>

        </div>

        <div className="modal fade" id="qrModal" tabIndex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="qrModalLabel">QR Code</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center" style={{ position: 'relative' }}>
                <div ref={qrCodeRef} style={{ position: 'relative', display: 'inline-block' }}>
                  <QRCodeCanvas
                    value={`https://www.quickcatalog.in/Menu/${encodeURIComponent(props.userLogged().userID)}`}
                    size={250}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '50px', // Logo width
                      height: '50px', // Logo height
                      zIndex: 1, // Ensure logo is above QR code
                      backgroundColor: 'blue', // Example background color
                      color: 'white', // Example text color
                      textAlign: 'center', // Center text horizontally
                      fontSize: '20px', // Example font size
                      borderRadius: '50%', // Make it a circle
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <img src="../images/qc1.png" alt="png" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  </div>
                </div>
                <h1>{props.userLogged().name}</h1>
                <button onClick={handleDownload}>Download QR Code</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <section className="login_content">
            <div className="tm-hero-text-container">
              <div className='row'>
                <div className='col-md-4 p-2'>
                  <div className='overflow-hidden rounded position-relative border' style={{ maxHeight: '63vh' }}>
                    <img id='profimg' className='w-100 h-auto' src='./images/profile-image.jpg' alt='userimg' />
                    <button type="button" className="btn btn-warning rounded-pill position-absolute top-0 end-0 m-3 p-1" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-pencil-square p-1"></i></button>
                  </div>


                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Change Profile Picture</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form id='shopImgForm' onSubmit={saveimageurl} encType="multipart/form-data">
                            <input className="form-control mb-3 rounded-pill d-none" type="text" id="userId" name="userId" defaultValue={props.userLogged().userID} />
                            <input className="form-control mb-3 rounded-pill" type="file" id="shopimg" name="imageUrl" accept="image/*" required />
                            <button className="btn btn-success rounded-pill float-end ms-3" type='submit'>Save</button>
                            <button type="button" className="btn btn-secondary float-end rounded-pill" data-bs-dismiss="modal">Cancel</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className='col-md-8 p-3'>
                  <hr />
                  <form className='m-3' id='shopdtl'>

                    <label htmlFor="category" className="form-label ms-3"><i className="bi bi-star-fill text-danger" style={{ fontSize: '0.6rem', verticalAlign: 'top' }}></i> Category:</label>
                    <select id="category" className="form-select mb-3 rounded-pill">
                      <option value="Food and beverage">Food and beverage</option>
                      <option value="Electrical and Electronics">Electrical and Electronics</option>
                      <option value="Medical">Medical</option>
                      <option value="Beaut parlour and Saloon">Beaut parlour and Saloon</option>
                      <option value="Tour and travellers">Tour and travellers</option>
                      <option value="Hotels">Hotels</option>
                      <option value="Others">Others</option>

                    </select>
                    <label htmlFor="name" className="form-label ms-3"><i className="bi bi-star-fill text-danger" style={{ fontSize: '0.6rem', verticalAlign: 'top' }}></i> Name:</label>
                    <input type="text" id="shopname" className="form-control mb-3 rounded-pill" placeholder="Name" required />
                    <label htmlFor="address" className="form-label ms-3"><i className="bi bi-star-fill text-danger" style={{ fontSize: '0.6rem', verticalAlign: 'top' }}></i> Address:</label>
                    <input type="text" id="address" className="form-control mb-3 rounded-pill" placeholder="address" required />

                    <div className='row'>
                      <div className='col-sm-6'>

                        <label htmlFor="fcinumber" className="form-label ms-3">Registration number:</label>
                        <input type="text" id="fcinumber" className="form-control mb-3 rounded-pill" placeholder="Registration number" />

                      </div>
                      <div className='col-sm-3'>
                        <label htmlFor="phonenumber1" className="form-label ms-3"><i className="bi bi-star-fill text-danger" style={{ fontSize: '0.6rem', verticalAlign: 'top' }}></i> Mob Number 1:</label>
                        <input type="text" id="phonenumber1" className="form-control mb-3 rounded-pill" placeholder="Phone Number1" required />
                      </div>
                      <div className='col-sm-3'>
                        <label htmlFor="phonenumber2" className="form-label ms-3">Mob Number 2:</label>
                        <input type="text" id="phonenumber2" className="form-control mb-3 rounded-pill" placeholder="Phone Number2" />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-sm-6'>
                        <label htmlFor="gstnumber" className="form-label ms-3">GST Number:</label>
                        <input type="text" id="gstnumber" className="form-control mb-3 rounded-pill" placeholder="GST Number" />
                      </div>
                      <div className='col-sm-6'>
                        <label htmlFor="aadharnumber" className="form-label ms-3">Aadhar Number:</label>
                        <input type="text" id="aadharnumber" className="form-control mb-3 rounded-pill" placeholder="Aadhar Number" />
                      </div>

                    </div>
                    <button className="btn btn-success rounded-pill px-3 ms-3" onClick={saveShopdtls}><i className="bi bi-check2-circle"></i> Save</button>

                  </form>
                </div>
              </div>

              <Products userLogged={props.userLogged()} />


            </div>
          </section>
        </div>
      </div>
      {loading && <Loader />}
    </>

  );
};

export default Userprofile;