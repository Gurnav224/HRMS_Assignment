import './App.css'
import {BrowserRouter ,  Routes , Route} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from './features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'
import Candidates from './features/candidates/Candidates'
import Employees from './features/employees/Employee'
import Attendance from './features/attendance/Attendance'
import Leaves from './features/leaves/Leaves'

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 < Date.now()){
        dispatch(logout())
      }
    }
  },[])

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Register/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route index element={<Dashboard/>}/>
          </Route>
            <Route path='/candidates' element={<PrivateRoute/>}>
              <Route index  element={<Candidates/>} />
            </Route>
            <Route path='/employees' element={<PrivateRoute/>}>
              <Route index  element={<Employees/>} />
            </Route>
            <Route path='/attendance' element={<PrivateRoute/>}>
              <Route index  element={<Attendance/>} />
            </Route>
            <Route path='/leaves' element={<PrivateRoute/>}>
              <Route index  element={<Leaves/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
