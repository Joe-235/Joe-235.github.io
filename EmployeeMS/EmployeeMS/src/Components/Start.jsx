import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate=useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:3000/verify')
    .then(result=>{
      if(result.data.Status){
        if(result.data.role === "admin"){
          navigate('/dashboard')
        }
        else if(result.data.role === "employee"){
          navigate('/employee_dashboard/'+result.data.id)

        }
        else{
          navigate('/employee_dashboard/'+result.data.id)

        }
      }
      
    }).catch(err=>console.log(err))
  },[])
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="text-center text-lg-start mt-4 pt-2">
              <div className="gap-2 mx-5">
                <button
                  type="button"
                  style={{ width: '60%',margin:'1%' }}
                  className="btn btn-primary btn-lg"
                  onClick={() => { navigate('/employee_login') }}
                >
                  Employee
                </button>
                <button
                  style={{ width: '60%',margin:'1%', backgroundColor:'#001F3F',color:'white'}}
                  type="button"
                  
                  className="btn btn-primary btn-lg"
                  onClick={() => { navigate('/adminlogin') }}
                >
                  Admin
                </button>
                <button
                  type="button"
                  style={{ width: '60%',margin:'1%' }}
                  className="btn btn-primary btn-lg"
                  onClick={() => { navigate('/agent_login') }}
                >
                  Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;

