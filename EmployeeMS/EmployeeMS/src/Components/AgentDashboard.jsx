import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

const AgentDashboard = () => {
    const [agent, setAgent] = useState([])
    const { id,agent_id } = useParams()
    const navigate = useNavigate();
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('http://localhost:3000/agent/logout')
            .then(result => {
                localStorage.removeItem("valid")
                if (result.data.Status) {
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }
    useEffect(() => {
        console.log(id,agent_id)
        axios.get(`http://localhost:3000/agent/detail/${agent_id}`)
            .then(result => setAgent(result.data[0]))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 " style={{backgroundColor:'#001F3F'}}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to={"/agent_dashboard/0/"+agent.id}
                            className="mask d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none "
                        >
                            <span className="fs-5 fw-bolder d-none d-sm-inline" >
                                J_Management
                            </span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="w-100" style={{marginRight:8}}>
                                <Link
                                    to={"/agent_dashboard/0/"+agent.id}
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard &nbsp;</span>
                                </Link>
                            </li>
                            
                            
                           
                            <li className="w-100" style={{marginRight:8}}>
                                <Link
                                    to={"/agent_dashboard/0/"+agent.id+'/list_of_appts'}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-person ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">List Of Appts</span>
                                </Link>
                            </li>
                            <li className="w-100" onClick={handleLogout} style={{marginRight:8}}>
                                <Link
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-power ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow" style={{ borderBottom: '2px solid #001F3F' }}>
                        <h4>Welcome {agent.name}</h4>
                    </div>
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default AgentDashboard