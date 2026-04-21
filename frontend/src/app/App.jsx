import './App.css'
import { RouterProvider } from "react-router"
import { routes } from "./app.routes.jsx"
import { useEffect } from 'react';
import { useAuth } from '../features/auth/hook/useAuth.js';

function App() {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>
    <RouterProvider router={routes} />
    </>
  )
}

export default App
