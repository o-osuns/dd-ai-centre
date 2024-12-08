import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './views/Login';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;
