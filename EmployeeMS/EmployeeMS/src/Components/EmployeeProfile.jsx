import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import '../App.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIfEx0Q3xbf1xzZFRMZVRbRHNPIiBoS35RdURiW3lfc3FdRmZaU0V1');

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '',
  })

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result => {
        const employeeData = result.data.Result[0];

        setEmployee({
          name: employeeData.name,
          email: employeeData.email,
          salary: employeeData.salary,
        });
      })
      .catch(err => console.log(err));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Update employee details
    axios.put(`http://localhost:3000/employee/edit_employee/${id}`, employee)
      .then(result => {
        console.log(result.data);
        navigate(-1);
      })
      .catch(err => console.log(err));

    // Change password
    if (passwords.newPassword && passwords.newPassword === passwords.confirmPassword) {
      const passwordData = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };

      axios.put(`http://localhost:3000/employee/change_password/${id}`, passwordData)
        .then(result => {
          console.log(result.data);
          alert('Password change successful');
        })
        .catch(err => {
          console.log(err);
          alert('Password change unsuccessful');
        });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className=" p-3 rounded border" style={{ width: '80%' }}>
        <h3 className="text-center">Edit employee</h3>
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
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}

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
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}

            />
          </div>


          
          <div className="col-12">
            <label htmlFor="inputCurrentPassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputCurrentPassword"
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputNewPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputNewPassword"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputConfirmPassword"
              placeholder="Confirm Password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default EmployeeProfile;
