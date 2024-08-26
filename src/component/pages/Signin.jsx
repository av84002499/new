import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css'

const Signin = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields',
      });
      return;
    }

    const formData = { email, password };

    try {
      setLoading(true);
      const response = await fetch('https://quickcatalog.online/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const responseData = await response.json();
      props.setUserLogged(responseData);
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
      navigate('/Userprofile');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: 'auto', marginTop: '7rem', marginBottom: '3rem' }}>
      <div className="card-body">
        <div className="animate form login_form" style={{ background: 'azure', padding: '10px' }}>
          <section className="login_content">
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img style={{ height: '200px' }} src="./images/hiring-tag.png" alt="Description" />
              </div>
              <h1 style={{ textAlign: 'center' }}>Login Form</h1>
              <div>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="row mt-2">
                  <div className="col-md-8 m-auto text-end">
                    <a className="reset_pass" href="/getresetpasswordotp">Lost your password?</a>
                  </div>
                  <div className="col-md-4 mt-2">
                    <button type="submit" className="width-35 btn btn-success" disabled={loading}>
                      <i className="ace-icon fa fa-key"></i>
                      <span className="bigger-110">Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="separator">
              <p className="change_link">or
                <a href="https://www.quickcatalog.in/GetLoginOTP"> <u>Login with OTP</u> </a>
              </p>
              <p className="change_link">New to site?
                <a href="https://www.quickcatalog.in/signup"> <u>SignUp</u> </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signin;
