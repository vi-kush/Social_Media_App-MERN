import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home'
// import Add from './pages/add/Add'
// import Profile from './pages/profile/Profile'
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { createContext, lazy, useState, Suspense } from 'react';

import Loader from './components/Loader/Loader'
const AddLoader = lazy(()=>import('./pages/add/Add'))
const Add = (props)=> (<Suspense fallback={<Loader/>}> <AddLoader {...props}/> </Suspense>)
const ProfileLoader = lazy(()=>import('./pages/profile/Profile'))
const Profile = (props)=> (<Suspense fallback={<Loader/>}> <ProfileLoader {...props}/> </Suspense>)

const authContext = createContext(null);

const Layout = () => (
  <div className="layout">
    <Navbar/>
    <div className="layoutContainer">
      <Outlet/>
    </div>
  </div>
)

function App() {  
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth') ? true : false)
  
  return (
    <authContext.Provider value={{loggedIn, setLoggedIn}} >
      
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>} />
              <Route path=":register" element={< Home/>}/>
              <Route path="create" element={<Add />}/>
              <Route path="profile" >
                <Route index element={<Profile section="personalinfo"/>} />
                <Route path=":Section" element={<Profile/>} />
              </Route>
            </Route>
            <Route path="*" element={<div className="notFound" style={{width:"100%",textAlign:"center"}}><h1>No Routes Found</h1></div>}/>
          </Routes>
        </div>
      </BrowserRouter>
    
    </authContext.Provider>
  );
}

export default App;
export { authContext };