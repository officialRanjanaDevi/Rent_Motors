import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/user/Navbar/Navbar'
import Footer from './components/user/Footer/Footer'
import Home from './pages/user/Home'
import Cart from './pages/user/Cart'
import Vehicle from './pages/user/Vehicle'
import View from './pages/user/View'
import Order from './pages/user/Order'
import Wishlist from './pages/user/Wishlist'
import Contact from './pages/user/Contact'
import Login from './pages/user/Login'
import Logout from './pages/user/Logout'
import Signup from './pages/user/Signup'
import Dashboard from './pages/admin/Dashboard'
// import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  )
}

function AppContent() {
  const location = useLocation();
  const adminPaths = ['/admin', '/addProduct', '/newOrder', '/updateProduct', '/cancelReq','/acceptedOrder'];
  const isLoggedIn=localStorage.getItem("isLoggedIn");
  const userType=localStorage.getItem("userType");
  return (
    <>
     
      {!adminPaths.includes(location.pathname) && <Navbar />}
      
      <Routes>
        {/* User Routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/vehicle' element={<Vehicle/>}/>
         <Route path='/contact' element={<Contact/>}/>
        <Route path='/view' element={<View/>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>

          {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute/>}> */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/order' element={<Order/>}/>
         {/* Admin Routes */}
         <Route path='/admin' element={<Dashboard panel="analysis"/>}/>
          <Route path='/addProduct' element={<Dashboard panel="addProduct"/>}/>
          <Route path='/newOrder' element={<Dashboard panel="newOrder"/>}/>
          <Route path='/acceptedOrder' element={<Dashboard panel="acceptedOrder"/>}/>
          <Route path='/updateProduct' element={<Dashboard panel="updateProduct"/>}/>
          <Route path='/cancelReq' element={<Dashboard panel="cancelReq"/>}/>
        
        {/* </Route> */}


       
      </Routes>

      
      {!adminPaths.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
