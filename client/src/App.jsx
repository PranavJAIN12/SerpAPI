

import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Success from './pages/success'
import Fail from './pages/fail'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/fail' element={<Fail/>}/>
      </Routes>
    </>
  )
}

export default App
