import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
       {/* Page Content */}
      <div className="container mt-5">
        <h1>Welcome to Mobile App Development</h1>
        <p>Manage your data efficiently using our mobile app.</p>
        <Link to="/registration" className="btn btn-primary me-2">Register</Link>
      </div>
    </>
  );
}

export default Home;
