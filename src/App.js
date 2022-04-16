import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home'
import Add from './pages/add/Add'
import Profile from './pages/profile/Profile'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const Layout = () => (
  <div className="layout">
    <Navbar/>
    <div className="layoutContainer">
      <Outlet/>
    </div>
  </div>
)

function App() {  

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path="new" element={<Add />}/>
            <Route path="profile" >
              <Route index element={<Profile section="personalinfo"/>} />
              <Route path=":Section" element={<Profile/>} />
            </Route>
          </Route>
          <Route path="*" element={<div className="notFound" style={{width:"100%",textAlign:"center"}}><h1>No Routes Found</h1></div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
