

import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Success from './pages/success'
import Fail from './pages/fail'

import Login from './pages/Login'
function App() {
  

  // document.addEventListener('contextmenu', event => event.preventDefault());
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/fail' element={<Fail/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
