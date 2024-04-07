import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from './Products.js';
import Swal from 'sweetalert2';

const Userprofile = (props) => {
  const navigate = useNavigate();
  const [shopdtl, setShopdtl] = useState(null);


  const getShopdtls = useCallback(async () => {
    const userId = props.userLogged().userID;
    if (!userId) {
      alert('Please Login again!');
      navigate('/Signin');
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
        navigate('/Signin');
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
    document.getElementById('age').value = shopdtl.age;
    document.getElementById('phonenumber').value = shopdtl.phonenumber;
    document.getElementById('gstnumber').value = shopdtl.gstnumber;
    document.getElementById('aadharnumber').value = shopdtl.aadharnumber;
    document.getElementById('profimg').src = 'https://qmunuback.onrender.com/uploads/' + shopdtl.imageUrl;
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
    const age = document.getElementById('age').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const gstnumber = document.getElementById('gstnumber').value;
    const aadharnumber = document.getElementById('aadharnumber').value;
    const formData = { shopname: shopname, address: address, age: parseInt(age), phonenumber: phonenumber, gstnumber: gstnumber, aadharnumber: aadharnumber, userId: userId };

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

      <div class="modal fade" id="qrModal" tabindex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="qrModalLabel">QR Code</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body m-auto">
              <iframe id="qrcode" src={"https://api.mimfa.net/qrcode?value=https://new-sage-nine.vercel.app/Menu/" + encodeURIComponent(props.userLogged().userID) + "&as=value"} width="250" height="250"></iframe>
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
                <h3>Welcome, {props.userLogged().name}</h3>
                <hr />
                <form className='m-3' id='shopdtl'>

                <label htmlFor="name" className="form-label ms-3"> Name:</label>
                <select id="shop" name="shopname" className="form-select">
                  <option value="barber shop">Barber Shop</option>
                  <option value="fruit corner">Fruit Corner</option>
                  <option value="hotel">Hotel</option>
                  <option value="shopname">shopname</option>

                </select>
                <input type="text" id="shopnameInput" className="form-control mb-3 rounded-pill" placeholder="Shop Name" required="" />
                
                  <label htmlFor="address" className="form-label ms-3">address:</label>
                  <input type="text" id="address" className="form-control mb-3 rounded-pill" placeholder="address" required="" />
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label htmlFor="age" className="form-label ms-3">age:</label>
                      <input type="text" id="age" className="form-control mb-3 rounded-pill" placeholder="age" required="" />
                    </div>
                    <div className='col-sm-6'>
                      <label htmlFor="phonenumber" className="form-label ms-3">Phone Number:</label>
                      <input type="text" id="phonenumber" className="form-control mb-3 rounded-pill" placeholder="Phone Number" required="" />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-sm-6'>
                      <label htmlFor="gstnumber" className="form-label ms-3">GST Number:</label>
                      <input type="text" id="gstnumber" className="form-control mb-3 rounded-pill" placeholder="GST Number" required="" />
                    </div>
                    <div className='col-sm-6'>
                      <label htmlFor="aadharnumber" className="form-label ms-3">Aadhar Number:</label>
                      <input type="text" id="aadharnumber" className="form-control mb-3 rounded-pill" placeholder="Aadhar Number" required="" />
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
