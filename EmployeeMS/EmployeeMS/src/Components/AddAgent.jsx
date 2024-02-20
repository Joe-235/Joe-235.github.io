import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddAgent = () => {
  const navigate = useNavigate()
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const [agent, setAgent] = useState({
    name: '',
    email: '',
    password: '',
    website: 'Planet',
    website_login: '',
    website_password: '',
    time_zone: 'EST',
    startHour:'06:00', 
    endHour:'24:00',

  })
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_Agent', agent)
      .then(result => {
        console.log(result.data)
        navigate(-1)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className=" p-3 rounded border " style ={{width:'80%'}}>
        <h3 className="text-center">Add Agent</h3>
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
              onChange={(e) => setAgent({ ...agent, name: e.target.value })}
              required
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
              onChange={(e) => setAgent({ ...agent, email: e.target.value })}
              required
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
              onChange={(e) => setAgent({ ...agent, password: e.target.value })}
              required
           />
          </div>
          <div className="col-12">
            <label for="website" className="form-label">
              Website
            </label>
            <select
              name='website'
              id='website'
              className='form-select'
              onChange={(e) => setAgent({ ...agent, website: e.target.value })}
              required
            >
              <option value='Planet'>Planet</option>
              <option value='Impact'>Impact</option>

            </select>
          </div>
          <div className="col-12">
            <label for="website_credentials" className="form-label">
              Website Credentials
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="website_login"
              placeholder="Login"
              onChange={(e) => setAgent({ ...agent, website_login: e.target.value })}
              required
            />
            <input
              type="text"
              className="form-control rounded-0"
              id="website_password"
              placeholder="Enter Password"
              onChange={(e) => setAgent({ ...agent, website_password: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label for="TimeZone" className="form-label">
              Time Zone
            </label>
            <select
              name='TimeZone'
              id='TimeZone'
              className='form-select'
              required
              onChange={(e) => setAgent({ ...agent, time_zone: e.target.value })}
            >
              <option value='EST' selected>EST</option>
              <option value='CST'>CST</option>
              <option value='MST'>MST</option>
              <option value='PST'>PST</option>
              <option value='Hawaii'>Hawaii</option>
              <option value='Alaska'>Alaska</option>


            </select>
          </div>

          <div className="col-12">
            <label for="startHour">Work Start Hour</label>
            <input
              type="time"
              id="startHour"
              name="startHour"
              className="form-control rounded-0"
              onChange={(e) => setAgent({ ...agent, startHour: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label for="endHour">Work End Hour</label>
            <input
              type="time"
              id="endHour"
              name="startHour"
              className="form-control rounded-0"
              onChange={(e) => setAgent({ ...agent, endHour: e.target.value })}
              required
            />
          </div>
          

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAgent