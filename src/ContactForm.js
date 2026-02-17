import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'f59d1d63-a509-47cc-a787-f8bcbe18b590',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('');
          onClose();
        }, 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close-btn" onClick={onClose}>
          <span className="close-icon">×</span>
        </button>

        <div className="contact-modal-content">
          <h2 className="contact-modal-title">Let's Connect</h2>
          <p className="contact-modal-subtitle">
            Have a project in mind or just want to chat? Drop me a message.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Hidden field for bot protection */}
            <input type="hidden" name="access_key" value="f59d1d63-a509-47cc-a787-f8bcbe18b590" />
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                placeholder="Tell me about your project or idea..."
                rows="5"
              />
            </div>

            {status === 'error' && (
              <p className="form-error">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              className="form-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
