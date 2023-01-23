import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import PrivateRoutes from './privateRoutes/PrivateRoutes';
import Signup from './pages/Register';
import ForgotPassword from './pages/ForgetPassword';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={
           <PrivateRoutes>
              <Dashboard />
          </PrivateRoutes>} />
      
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/forget-password' element={<ForgotPassword/>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
