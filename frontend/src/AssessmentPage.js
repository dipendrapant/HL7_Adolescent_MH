import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AssessmentPage() {
  const [score, setScore] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const navigate = useNavigate();

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(name);
  };

  const validatePatientId = (id) => {
    // Simple validation for length and character content
    const regex = /^[A-Z0-9]{1,20}$/; // PID.2 is CX - Alphanumeric, up to 20 characters
    return regex.test(id);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (validateName(name)) {
      setPatientName(name);
      setNameError('');
    } else {
      setNameError('Patient name should only contain letters and spaces.');
    }
  };

  const handleIdChange = (e) => {
    const id = e.target.value.toUpperCase(); // Ensure uppercase for ID
    if (validatePatientId(id)) {
      setPatientId(id);
      setIdError('');
    } else {
      setIdError('Patient ID should be alphanumeric and up to 20 characters.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (nameError || idError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/assessment/', {
        phq9_score: score,
        patient_id: patientId,
        patient_name: patientName,
        patient_gender: patientGender,
      });
      navigate('/results', { state: { hl7Message: response.data.hl7_message } });
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.error);
        alert(`Error: ${error.response.data.error}`);
      } else {
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>PHQ-9 Assessment</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Patient ID:</label>
          <input
            type="text"
            value={patientId}
            onChange={handleIdChange}
            required
            style={styles.input}
            maxLength="20" // Limit to 20 characters
          />
          {idError && <span style={styles.error}>{idError}</span>}
        </div>
        <div style={styles.formGroup}>
          <label>Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={handleNameChange}
            required
            style={styles.input}
            maxLength="250" // Limit to 250 characters
          />
          {nameError && <span style={styles.error}>{nameError}</span>}
        </div>
        <div style={styles.formGroup}>
          <label>Patient Gender:</label>
          <select
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            required
            style={styles.select}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="LGBTQ">LGBTQ</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>PHQ-9 Score:</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            style={styles.input}
            min="0"
            max="27"
          />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#f0f4f8',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
};

export default AssessmentPage;
