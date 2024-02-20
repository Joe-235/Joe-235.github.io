import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status)
          setEmployee(result.data.Result)
        else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [])
  const handleFreeze = (id) => {
    axios.put(`http://localhost:3000/auth/freeze_employee/${id}`)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        }
        else {
          alert(result.data.Error)
        }

      }).catch(err => console.log(err))
  }
  return (
    <div className='px-3 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>
          Employee List
        </h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              employee.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.salary}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${c.id}`} className='btn btn-info btn-sm me-2 my-2'>Edit</Link>
                    <button
                      className='btn btn-primary btn-sm my-1'
                      onClick={() => handleFreeze(c.id)}
                    >
                      Freeze
                    </button>
                  </td>
                  
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>


    </div>
  )
}

export default Employee