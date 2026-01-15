import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Results from './pages/results/Results'
import Upload from './pages/upload/Upload'
import { PrivateRoute } from './routes/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
      <div className=''>
          <AuthProvider>
            <BrowserRouter>
            <div className='min-h-[80vh]'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/upload' element={
                  <PrivateRoute>
                    <Upload />
                  </PrivateRoute>
                } />
                <Route path='/results' element={
                  <PrivateRoute>
                    <Results />
                  </PrivateRoute>
                } />
                
                {/* <Route path='/login' element={<Login />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
          </AuthProvider>
      </div>
    </>
  )
}

export default App
