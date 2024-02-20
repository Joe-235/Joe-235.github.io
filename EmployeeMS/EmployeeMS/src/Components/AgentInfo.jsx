import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AgentInfo = () => {
    const [agent, setAgent] = useState([]);
    const [assignedEmployees, setAssignedEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const result = await axios.get('http://localhost:3000/auth/agent');
                if (result.data.Status) {
                    setAgent(result.data.Result);
                    // Fetch and set assigned employees for all agents
                    const employeesPromises = result.data.Result.map((agent) =>
                        fetchAssignedEmployees(agent.id)
                    );
                    Promise.all(employeesPromises).then((employeeData) => {
                        // Flatten the array of arrays into a single array
                        const flattenedEmployees = [].concat(...employeeData);
                        setAssignedEmployees(flattenedEmployees);
                    });
                } else {
                    alert(result.data.Error);
                }
            } catch (err) {
                console.error('Error fetching agents:', err);
            }
        };

        const fetchAssignedEmployees = async (agentId) => {
            try {
                const result = await axios.get(`http://localhost:3000/auth/assigned_employee/${agentId}`);
                console.log(`Fetched assigned employees for agent ${agentId}:`, result.data);

                if (result.data.Status) {
                    return result.data.Result.map((employee) => ({
                        agentId,
                        assigned_employee_name: employee.assigned_employee_name,
                    }));
                } else {
                    alert(result.data.Error);
                    return [];
                }
            } catch (err) {
                console.error('Error fetching assigned employees:', err);
                return [];
            }
        };

        fetchAgentData();
    }, []);

    return (
        <div className='px-3 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Agent List</h3>
            </div>
           
            <div className='mt-3'>
                <table className='table table-sm'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Time Zone</th>
                            <th>Website</th>
                            <th>Website Login</th>
                            <th>Website Password</th>
                            <th>Assigned Employees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agent.map((c) => (
                            <tr key={c.id}>
                                <td className='text-nowrap'>{c.name}</td>
                                <td className='text-nowrap'>{c.email}</td>
                                <td className='text-nowrap'>{c.time_zone}</td>
                                <td className='text-nowrap'>{c.website}</td>
                                <td className='text-nowrap'>{c.website_login}</td>
                                <td className='text-nowrap'>{c.website_password}</td>
                                <td className='text-nowrap'>
                                    <ul>
                                        {assignedEmployees
                                            .filter((emp) => emp.agentId === c.id)
                                            .map((emp) => (
                                                <li key={emp.assigned_employee_name}>
                                                    {emp.assigned_employee_name}
                                                </li>
                                            ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentInfo;
