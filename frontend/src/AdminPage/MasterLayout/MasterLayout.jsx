import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom'; // Assuming you're using React Router

const Layout = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Layout;
