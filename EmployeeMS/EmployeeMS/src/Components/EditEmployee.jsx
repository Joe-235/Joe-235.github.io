import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        password: '',

    })
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
                    password: '',
                });
            })
            .catch(err => console.log(err));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/auth/edit_employee/${id}`,employee)
        .then(result=>{
            console.log(result.data)
            navigate(-1)

        }).catch(err => console.log(err))
    }
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
                        <label for="Salary" className="form-label">
                            Salary            
                        </label>
                        <input
                            type="number"
                            className="form-control rounded-0"
                            id="salary"
                            placeholder="Salary"
                            value={employee.salary}
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}

                        />
                        
                    </div>
                    <div className="col-12">
                        <label for="Password" className="form-label">
                            Password            
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}

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
}

export default EditEmployee