import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Address</h4>
          <p>
            123 Foodie Lane
            <br />
            Culinary City, FL 12345
          </p>
        </div>
        <div className="col-md-6">
          <h4>Phone</h4>
          <p>(123) 456-7890</p>
          <h4>Email</h4>
          <p>contact@foodiesparadise.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
