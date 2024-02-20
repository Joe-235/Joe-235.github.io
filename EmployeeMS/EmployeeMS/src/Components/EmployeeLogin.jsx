import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
      });
      const [error, setError] = useState(null);
      const navigate = useNavigate();
      axios.defaults.withCredentials = true;
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/employee/employee_login', values)
          .then(result => {
            if (result.data.loginStatus) {
              localStorage.setItem("valid", true)
              navigate('/employee_dashboard/'+ result.data.id);
            } else {
              setError(result.data.Error);
            }
          })
          .catch(err => console.log(err));
      };
    
      return (
        <div className="vh-100 d-flex justify-content-center align-items-center login-container">
          <div className="container-fluid h-custom login-form-container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <div className='text-danger'>
                  {error && error}
                </div>
                <form onSubmit={handleSubmit}>
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                  <div className="form-outline mb-1">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                  </div>
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <div className="form-outline mb-1">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center"></div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn btn-lg"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem',backgroundColor:'#001F3F',color:'white' }}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}

export default EmployeeLogin