import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(location.state.hl7Message);
    alert('HL7 message copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Assessment Results</h1>
      {location.state && location.state.hl7Message ? (
        <div style={styles.resultBox}>
          <h2 style={styles.hl7Heading}>Generated HL7 Message</h2>
          <pre style={styles.pre}>{location.state.hl7Message}</pre>
          <button onClick={handleCopy} style={styles.copyButton}>Copy</button>
          
          <div style={styles.explanationBox}>
            <h3>HL7 Message Segments Explanation</h3>
            <p><strong>MSH</strong>: Message Header - Contains metadata about the message such as the sending application, date, and message type.</p>
            <p><strong>|^~\&</strong>: Field Separator and Encoding Characters - These define how the HL7 message is structured.</p>
            <p><strong>DjangoApp</strong>: Sending Application - The system or application that generated the message (in this case, your Django app).</p>
            <p><strong>HealthcareProvider</strong>: Sending Facility - The healthcare facility that is sending the message.</p>
            <p><strong>20240901121706</strong>: Date/Time of Message - The exact date and time when the message was generated.</p>
            <p><strong>ORU^R01</strong>: Message Type - Specifies the type of message; ORU stands for Observation Result, and R01 is the trigger event.</p>
            <p><strong>12345</strong>: Message Control ID - A unique identifier for the message to track and manage it.</p>
            <p><strong>P</strong>: Processing ID - Indicates whether the message is part of production (P) or testing (T).</p>
            <p><strong>2.5</strong>: Version ID - Specifies the version of the HL7 standard used (in this case, version 2.5).</p>
          </div>
          
        </div>
      ) : (
        <p>No data to display.</p>
      )}
      <button onClick={handleBack} style={styles.button}>Back to Assessment</button>
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
  hl7Heading: {
    fontSize: '22px', 
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  resultBox: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  pre: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    overflowX: 'auto',  
    whiteSpace: 'pre-wrap',  
    wordBreak: 'break-all',  
    fontSize: '16px', 
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  copyButton: {
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  explanationBox: {
    marginTop: '20px',
    textAlign: 'left',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    fontSize: '14px',  
    lineHeight: '1.5', 
  },
};

export default ResultsPage;
