import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom'; // Assuming you're using React Router
import Sidebar from '../components/sidebar/Sidebar';
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
