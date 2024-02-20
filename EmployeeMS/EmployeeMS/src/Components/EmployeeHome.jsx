import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeHome = () => {
  const navigate = useNavigate();
  const [agent,setAgent]=useState([])
  const {id} = useParams()
  useEffect(() => {
    axios.get(`http://localhost:3000/employee/assigned_agent/${id}`)
      .then(result => {
        setAgent(result.data.Result)
        
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='px-3 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Agent List</h3>
        </div>
       
        <div className='mt-3'>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Time Zone</th>
                        <th>Website Credentials</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {agent.map((c) => (
                        <tr key={c.id} onClick={()=>navigate('employee_doc/'+c.id)}>
                            <td className='text-nowrap'>{c.name}</td>
                            <td className='text-nowrap'>{c.email}</td>
                            <td className='text-nowrap'>{c.time_zone}</td>
                            <td className='text-nowrap'>Login:{c.website_login}<br/>Password:{c.website_login}</td>

              
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default EmployeeHome