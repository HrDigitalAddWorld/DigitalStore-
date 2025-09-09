import React from "react";
import "./Contact.css"; // Custom styles (optional)

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Reach out to us through any of the following ways:</p>

      <div className="contact-info">
        <p><strong>📍 Address:</strong> Jaipur, Rajasthan, India</p>
        <p><strong>📧 Email:</strong> support@digitalstore.com</p>
        <p><strong>📱 Phone:</strong> +91 7300004094</p>
      </div>

      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
