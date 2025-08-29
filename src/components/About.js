import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Add only if not already imported globally

function About() {
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
        <h2 className="mb-4" style={{ color: '#4a3f6b' }}>
          <i className="bi bi-info-circle-fill me-2" style={{ color: '#5a2a83' }}></i>
          About Mobile App Development
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          This app is developed to demonstrate mobile app skills using <strong>React</strong> and <strong>Firebase</strong>.
        </p>
      </div>
    </div>
  );
}

export default About;
