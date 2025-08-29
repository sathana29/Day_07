import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Only needed if not globally imported

function Home() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '80vh',
        padding: '2rem',
      }}
    >
      <div
        className="p-5 rounded shadow"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* ✅ Add icon to heading */}
        <h1 className="mb-4" style={{ color: '#4a3f6b' }}>
          <i className="bi bi-phone-fill me-2" style={{ color: '#5a2a83' }}></i>
          Welcome to Mobile App Development
        </h1>

        <p className="mb-4" style={{ fontSize: '1.1rem', color: '#555' }}>
          Manage your data efficiently using our mobile app.
        </p>

        {/* ✅ Add icon inside the button */}
        <Link to="/registration" className="btn btn-primary btn-lg">
          <i className="bi bi-person-plus-fill me-2"></i>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
