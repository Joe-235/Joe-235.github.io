import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const navigate=useNavigate();
    const [employee, setEmployee]=useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        

    })

    const handleSubmit = (e)=>{
      
      e.preventDefault();
      axios.post('http://localhost:3000/auth/add_employee',employee)
      .then(result => {
        console.log(result.data)
        navigate('/dashboard/employee')
      })
      .catch(err => console.log(err))
    }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className=" p-3 rounded border " style={{width:'60%'}}>
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              required
            onChange={(e)=>setEmployee({...employee,name:e.target.value})}
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              required
              onChange={(e)=>setEmployee({...employee,email:e.target.value})}

            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e)=>setEmployee({...employee,password:e.target.value})}
              required
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e)=>setEmployee({...employee,salary:e.target.value})}
              required
            />
          </div>
         
          
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee