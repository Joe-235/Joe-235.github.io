import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Inactive = () => {
    const [agent, setAgent] = useState([]);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/inactive_agent')
            .then(result => {
                if (result.data.Status)
                    setAgent(result.data.Result);
                else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3000/auth/inactive_employee')
            .then(result => {
                if (result.data.Status)
                    setEmployee(result.data.Result);
                else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleFreezeEmployeeAgent = (id) => {
        axios.put(`http://localhost:3000/auth/freeze_agent/${id}`)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };
    const handleFreezeEmployee = (id) => {
        axios.put(`http://localhost:3000/auth/freeze_employee/${id}`)
            .then(result => {
                if (result.data.Status) {
                    window.location.reload();
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='px-4 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Inactive List</h3>
            </div>
            <div className='mt-2'>
                <div className='table-responsive'>
                    <h4>Inactive Agents</h4>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Name</th>
                                <th style={{ width: '25%' }}>Email</th>
                                <th style={{ width: '25%' }}>Time Zone</th>
                                <th style={{ width: '25%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agent.map(c => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.time_zone}</td>
                                    <td>
                                        <button
                                            className='btn btn-primary btn-sm my-1'
                                            onClick={() => handleFreezeEmployeeAgent(c.id)}
                                        >
                                            Unfreeze
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='table-responsive'>
                    <h4>Inactive Employees</h4>
                    <table className='table mt-2'>
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Name</th>
                                <th style={{ width: '25%' }}>Email</th>
                                <th style={{ width: '25%' }}>Salary</th>
                                <th style={{ width: '25%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map(c => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.salary}</td>
                                    <td>
                                        <button
                                            className='btn btn-primary btn-sm my-1'
                                            onClick={() => handleFreezeEmployee(c.id)}
                                        >
                                            Unfreeze
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inactive;
