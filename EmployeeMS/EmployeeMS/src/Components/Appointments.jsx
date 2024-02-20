import axios from 'axios'
import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Appointments = () => {
    const { id,agent_id } = useParams()
    const [appointments,setAppointments]= useState([])
    useEffect(() => {
        console.log(id,agent_id)
        axios.get(`http://localhost:3000/agent/appointments/${agent_id}`)
            .then(result => setAppointments(result.data.Result))
            .catch(err => console.log(err))
    }, [])
    function formatDateTime(dateString) {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC',  // Assuming input date is in UTC format
          timeZoneName: 'short',  // Include time zone abbreviation
        };

        
      
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString('en-US', options);
        
        return formattedDate;
      }
      const handleShow = (id,show) => {
        console.log(show);
        axios.put(`http://localhost:3000/agent/set_show/${id}`, { show: show })
            .then(result => {
                console.log(result.data);
            })
            .catch(err => console.log(err));
            window.location.reload()

        
    };
   
  return (
    <div className='px-3 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Agent List</h3>
            </div>
           
            <div className='mt-3'>
                <table className='table table-sm table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Show/NoShow</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((c) => (
                            <tr key={c.id}>
                                <td className='text-nowrap'>{c.Name}</td>
                                <td className='text-nowrap'>{c.Email}</td>
                                <td className='text-nowrap'>{formatDateTime(c.StartTime)}</td>
                                <td className='text-nowrap'>{formatDateTime(c.EndTime)}</td>
                                <td className='text-nowrap'>{c.show}</td>

                                <td className='text-nowrap'>
                                <button
                                        className="btn btn-success btn-sm my-1"
                                        onClick={() => {
                                            handleShow(c.id,'Show')}}
                                        style={{ marginRight: '7px' }}
                                    >
                                        Show
                                </button>
                                <button
                                        className="btn btn-danger btn-sm my-1"
                                        onClick={() => {
                                            handleShow(c.id, 'No Show')}}
                                        style={{ marginRight: '7px' }}
                                    >
                                        No Show
                                </button>                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Appointments