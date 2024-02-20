import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Components/Home'
import Employee from './Components/Employee'
import AgentInfo from './Components/AgentInfo'
import AddEmployee from './Components/AddEmployee'
import Agent from './Components/Agent'
import AddAgent from './Components/AddAgent'
import EditAgent from './Components/EditAgent'
import Dashboard from './Components/Dashboard'
import Inactive from './Components/Inactive'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDashboard from './Components/EmployeeDashboard'
import EmployeeHome from './Components/EmployeeHome'
import EmployeeProfile from './Components/EmployeeProfile'
import { useEffect } from 'react'
import PrivateRoute from './Components/PrivateRoute'
import AgentDoc from './Components/AgentDoc'
import AgentLogin from './Components/AgentLogin'
import AgentDashboard from './Components/AgentDashboard'
import Appointments from './Components/Appointments'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start/>}></Route>
         <Route path='/adminlogin' element={<Login />}></Route>
         <Route path='/employee_login' element={<EmployeeLogin />}></Route>
         <Route path='/agent_login' element={<AgentLogin/>}></Route>

         <Route path='/agent_dashboard/:id/:agent_id' element = {
         <PrivateRoute> <AgentDashboard/> </PrivateRoute>
         }>
          <Route path='' element = {<AgentDoc/>}></Route>
          <Route path='/agent_dashboard/:id/:agent_id/list_of_appts' element = {<Appointments/>}></Route>


         </Route>

         <Route path='/employee_dashboard/:id' element = {
         <PrivateRoute> <EmployeeDashboard/> </PrivateRoute>
         }>
          <Route path='' element = {<EmployeeHome/>}></Route>
          <Route path='/employee_dashboard/:id/profile' element = {<EmployeeProfile/>}></Route>
          <Route path='/employee_dashboard/:id/employee_doc/:agent_id' element = {<AgentDoc/>}></Route>

         </Route>

         <Route path='/dashboard' element={
         <PrivateRoute>
            <Dashboard />
         </PrivateRoute>
         }>
          <Route path='' element = {<Home/>}></Route>
          <Route path='/dashboard/employee' element = {<Employee/>}></Route>
          <Route path='/dashboard/inactive' element = {<Inactive/>}></Route>
          <Route path='/dashboard/agent' element = {<Agent/>}></Route>
          <Route path='/dashboard/AgentInfo' element = {<AgentInfo/>}></Route>
          <Route path='/dashboard/add_employee' element = {<AddEmployee/>}></Route>
          <Route path='/dashboard/add_agent' element = {<AddAgent/>}></Route>
          <Route path='/dashboard/edit_agent/:id' element = {<EditAgent/>}></Route>
          <Route path='/dashboard/edit_employee/:id' element = {<EditEmployee/>}></Route>





         </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
