import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email address");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone must be a 10-digit number");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        timestamp: new Date()
      });

      setFormData({ name: '', email: '', phone: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      console.error("Error adding document:", err);
      alert("Submission failed. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          maxWidth: '480px',
          width: '100%',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: '#5a2a83', fontWeight: '700', letterSpacing: '1.2px' }}
        >
          User Registration
        </h3>

        {success && (
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <i className="bi bi-check-circle-fill me-2 text-success"></i>
            🎉 Registration successful!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '600' }}>
              Full Name
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 ">
                <i className="bi bi-person-fill "></i>
              </span>
              <input
                type="text"
                name="name"
                className="form-control border-start-0"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '600' }}>
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-envelope-fill "></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control border-start-0"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: '600' }}>
              Phone Number
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-telephone-fill "></i>
              </span>
              <input
                type="text"
                name="phone"
                className="form-control border-start-0"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
            style={{
              backgroundColor: '#5a2a83',
              border: 'none',
              padding: '12px',
              fontWeight: '600',
              fontSize: '16px',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#764ba2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5a2a83'}
          >
            {loading ? (
              <>
                <i className="bi bi-arrow-repeat me-2 spin"></i>Submitting...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2"></i>Submit
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
