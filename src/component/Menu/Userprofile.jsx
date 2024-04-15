import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from './Products.js';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';




const Userprofile = (props) => {
  const navigate = useNavigate();
  const [shopdtl, setShopdtl] = useState(null);

  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    const qrCodeNode = qrCodeRef.current;

    html2canvas(qrCodeNode).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'qrcode.png');
      });
    });
  };



  const getShopdtls = useCallback(async () => {
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/getloginotp');
      return;
    }

    try {
      const formData = { 'userId': userId };
      const response = await fetch('https://qmunuback.onrender.com/api/userdata/getuserdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": props.userLogged().token,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert('Failed to load!!');
        navigate('/getloginotp');
        return;
      }
      try {
        const responseData = await response.json();
        setShopdtl(responseData);
      }
      catch {
        console.log('Something went wrong!!');
        alert('Failed to load!');
        return;
      }
    }
    catch (error) {
      console.error('Error loading details:', error.message);
      alert(error.message);
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
    document.getElementById('profimg').src = 'https://qmunuback.onrender.com/uploads/' + shopdtl.imageUrl;
  }

  const saveShopdtls = async (event) => {
    event.preventDefault();
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/getloginotp');
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

    console.log(formData);
    try {
      const response = await fetch('https://qmunuback.onrender.com/api/userdata/', {
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
    navigate('/Signin');
    return;
  }
  useEffect(() => {
    getShopdtls();
  }, [getShopdtls]);
  return (
    <div className="card shadow" style={{ maxWidth: '80vw', margin: 'auto', marginTop: '7rem', marginBottom: '3rem' }}>
      <div className="card-header text-center text-white" style={{ backgroundColor: '#2a5c99' }}>
        <h2 className="tm-hero-title mb-0 position-relative">
          My Profile
          <button type="button" className="btn position-absolute top-0 end-0 p-1 text-white" data-bs-toggle="modal" data-bs-target="#qrModal"><i class="bi bi-upc-scan"></i></button>
        </h2>
      </div>

      <div className="modal fade" id="qrModal" tabIndex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="qrModalLabel">QR Code</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
        <div ref={qrCodeRef}>
          <QRCode
            value={`https://new-sage-nine.vercel.app/Menu/${encodeURIComponent(props.userLogged().userID)}`}
            size={250}
          />
          <text
            QC
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50px', // Logo width
              height: '50px', // Logo height
              zIndex: 1, // Ensure logo is above QR code
            }}
          />
        </div>
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
                  <img id='profimg' src='./images/t-client-img-1.jpg' width='100%' alt='userimg' />
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
                        <form id='shopImgForm' action="https://qmunuback.onrender.com/api/upload/shopimg" method="post" encType="multipart/form-data">
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
                <h3>Welcome, {props.userLogged().name}<button className='btn btn-sm btn-danger rounded-pill float-end' onClick={logoutUser}>Logout</button></h3>
                <hr />
                <form className='m-3' id='shopdtl'>
                  <label htmlFor="category" className="form-label ms-3">category:</label>
                  <select id="category" className="form-select mb-3 rounded-pill">
                    <option value="Food and beverage">Food and beverage</option>
                    <option value="Electrical and Electronics">Electrical and Electronics</option>
                    <option value="Medical">Medical</option>
                    <option value="Beaut parlour and Saloon">Beaut parlour and Saloon</option>
                    <option value="Tour and travellers">Tour and travellers</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Others">Others</option>

                  </select>
                  <label htmlFor="shopname" className="form-label ms-3">Shop Name:</label>
                  <input type="text" id="shopname" className="form-control mb-3 rounded-pill" placeholder="Shop Name" required />
                  <label htmlFor="address" className="form-label ms-3">Address:</label>
                  <input type="text" id="address" className="form-control mb-3 rounded-pill" placeholder="address" required />

                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor="fcinumber" className="form-label ms-3">FCI Number</label>
                      <input type="text" id="fcinumber" className="form-control mb-3 rounded-pill" placeholder="FCI Number" required />
                    </div>
                    <div className='col-sm-3'>
                      <label htmlFor="phonenumber1" className="form-label ms-3">Phone Number 1:</label>
                      <input type="text" id="phonenumber1" className="form-control mb-3 rounded-pill" placeholder="Phone Number1" required />
                    </div>
                    <div className='col-sm-3'>
                      <label htmlFor="phonenumber2" className="form-label ms-3">Phone Number 2:</label>
                      <input type="text" id="phonenumber2" className="form-control mb-3 rounded-pill" placeholder="Phone Number2" required />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-sm-6'>
                      <label htmlFor="gstnumber" className="form-label ms-3">GST Number:</label>
                      <input type="text" id="gstnumber" className="form-control mb-3 rounded-pill" placeholder="GST Number" required />
                    </div>
                    <div className='col-sm-6'>
                      <label htmlFor="aadharnumber" className="form-label ms-3">Aadhar Number:</label>
                      <input type="text" id="aadharnumber" className="form-control mb-3 rounded-pill" placeholder="Aadhar Number" required />
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


  );
};

export default Userprofile;
