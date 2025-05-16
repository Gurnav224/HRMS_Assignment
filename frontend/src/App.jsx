import './App.css'
import {BrowserRouter ,  Routes , Route} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Register/>}/>
          <Route path='/login'  element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
