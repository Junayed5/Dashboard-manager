import { useEffect } from 'react';
import './App.css'
import { Outlet, useNavigate } from 'react-router'
import { Toaster } from 'react-hot-toast';

function App() {

  const pathName = window.location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (pathName === "/" || null) {
      navigate("/login");
    }
  }, [pathName])


  return (
    <>
      <Outlet />
      <Toaster position='top-right' />
    </>
  )
}

export default App
