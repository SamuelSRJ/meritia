import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Upload from './pages/upload/Upload'

function App() {

  return (
    <>
      <div className=''>
          <BrowserRouter>
            <div className='min-h-[80vh]'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/upload' element={<Upload />} />
                {/* <Route path='/login' element={<Login />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
      </div>
    </>
  )
}

export default App
