import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'

const Agent = () => {
    const [agent, setAgent] = useState([])
    const [employee, setEmployee] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const navigate = useNavigate();
    const options = employee.map(c => {
        return { value: c.id, label: c.name }
    })
    useEffect(() => {
        axios.get('http://localhost:3000/auth/agent')
            .then(result => {
                if (result.data.Status)
                    setAgent(result.data.Result)
                else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
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
    const handleShare = (agent_id) => {

        alert('succesfully done')
        axios.put('http://localhost:3000/auth/set_old_inactive/' + agent_id)
            .then(result => console.log(result))
            .catch(err => console.log(err))

        selectedEmployees.forEach(employee => {
            const url = `http://localhost:3000/auth/assign_employee/${agent_id}`;
            const data = { value: employee.value };

            axios.post(url, data)
                .then(result => console.log(result))
                .catch(err => console.log(err));
        });
        window.location.reload()

    }


    const handleFreeze = (id) => {
        axios.put('http://localhost:3000/auth/set_old_inactive/' + id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        axios.put(`http://localhost:3000/auth/freeze_agent/${id}`)
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
                    Agent List
                </h3>
            </div>
            <Link to="/dashboard/add_agent" className='btn btn-success'>Add Agent</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Share Agent</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {agent.map((c) => (
                            <tr key={c.id}>
                                <td className="text-nowrap">{c.name}</td>
                                <td className="text-nowrap">
                                    <Select
                                        isMulti
                                        name="employees"
                                        options={options}
                                        onChange={setSelectedEmployees}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </td>
                                <td className="text-nowrap">
                                    <Link to={`/dashboard/edit_agent/${c.id}`} className="btn btn-info btn-sm me-2 my-2">
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-primary btn-sm my-1"
                                        onClick={() => handleFreeze(c.id)}
                                        style={{ marginRight: '7px' }}
                                    >
                                        Freeze
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm my-1 bi bi-box-arrow-up-right"
                                        onClick={() => {
                                            handleShare(c.id)
                                        }}
                                    >

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Agent