import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [agentTotal, setAgentTotal] = useState(0);
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    agentCount();
    salarySum();
    AdminRecords();
  }, []);

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        if (result.data.Status)
          setAdminTotal(result.data.Result[0].admin)
      }).catch(err=>console.log(err))
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status)
          setEmployeeTotal(result.data.Result[0].employee)
      }).catch(err=>console.log(err))
  };

  const agentCount = () => {
    axios.get('http://localhost:3000/auth/agent_count')
      .then(result => {
        if (result.data.Status)
          setAgentTotal(result.data.Result[0].agent)
      }).catch(err=>console.log(err))
  };

  const salarySum = () => {
    axios.get('http://localhost:3000/auth/salary_sum')
      .then(result => {
        if (result.data.Status)
          setSalaryTotal(result.data.Result[0].sum)
      }).catch(err=>console.log(err))
  };
  const AdminRecords = ()=>{
    axios.get('http://localhost:3000/auth/admin')
      .then(result => {
        if (result.data.Status)
          setAdmins(result.data.Result)
      }).catch(err=>console.log(err))
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="px-2 pt-2 pb-2 border shadow-sm">
            <div className="text-center pb-1">
              <h4 style={{ fontSize: '1.2rem' }}>Admin</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5 style={{ fontSize: '1rem' }}>Total:</h5>
              <h5 style={{ fontSize: '1rem' }}>{adminTotal}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="px-2 pt-2 pb-2 border shadow-sm">
            <div className="text-center pb-1">
              <h4 style={{ fontSize: '1.2rem' }}>Employee</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5 style={{ fontSize: '1rem' }}>Total:</h5>
              <h5 style={{ fontSize: '1rem' }}>{employeeTotal}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="px-2 pt-2 pb-2 border shadow-sm">
            <div className="text-center pb-1">
              <h4 style={{ fontSize: '1.2rem' }}>Agents</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5 style={{ fontSize: '1rem' }}>Total:</h5>
              <h5 style={{ fontSize: '1rem' }}>{agentTotal}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="px-2 pt-2 pb-2 border shadow-sm">
            <div className="text-center pb-1">
              <h4 style={{ fontSize: '1.2rem' }}>Salary</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5 style={{ fontSize: '1rem' }}>Total:</h5>
              <h5 style={{ fontSize: '1rem' }}>${salaryTotal}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-3 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, index) => (
              <tr key={index}>
                <td>{a.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
