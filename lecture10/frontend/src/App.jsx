import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Components/HomePage'
import RegisterPage from './Components/RegisterPage'
import PageNotFound from './Components/PageNotFound'
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          {/*<Route path="/login" element={<LoginPage/>} />*/}
          <Route path="/*" element={<PageNotFound/>} />
          {/*<Route path="/private" element={<PrivatePage/>} />*/}
        </Routes>
      </Router>
    </>
  )
}

export default App
