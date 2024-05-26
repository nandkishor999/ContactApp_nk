import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetails';

 import { useNavigate } from 'react-router-dom';
export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({ name: '', email: '', number: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
    // Optionally, you can reset the form fields after submission
    setFormData({ name: '', email: '', number: '' });
 
    navigate('/view');
  };

  return (
    <div className="form-container">
      <h2>Create Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          type="number"
          name="number"
          placeholder="Enter Phone"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Contact</button>
      </form>
    </div>
  );
}
