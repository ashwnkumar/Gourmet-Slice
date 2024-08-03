import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="container mx-auto mt-10 px-4 py-8 bg-white bg-opacity-90 rounded-lg shadow-xl"
    >
      <h2 className="text-center mb-8 text-4xl font-bold text-gray-800 drop-shadow-lg">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-start p-6 border-l-4 border-green-500 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <FaMapMarkerAlt className="text-4xl text-green-500 mb-2" />
          <h4 className="text-xl font-semibold text-gray-800">Address</h4>
          <p className="text-gray-600">
            123 Foodie Lane
            <br />
            Culinary City, FL 12345
          </p>
        </div>
        <div className="flex flex-col items-start p-6 border-l-4 border-red-500 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <FaPhone className="text-4xl text-red-500 mb-2" />
          <h4 className="text-xl font-semibold text-gray-800">Phone</h4>
          <p className="text-gray-600">(123) 456-7890</p>
        </div>
        <div className="flex flex-col items-start p-6 border-l-4 border-blue-500 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <FaEnvelope className="text-4xl text-blue-500 mb-2" />
          <h4 className="text-xl font-semibold text-gray-800">Email</h4>
          <p className="text-gray-600">contact@foodiesparadise.com</p>
        </div>
        <div className="flex flex-col items-start p-6 border-l-4 border-orange-500 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <FaClock className="text-4xl text-orange-500 mb-2" />
          <h4 className="text-xl font-semibold text-gray-800">Opening Hours</h4>
          <p className="text-gray-600">Mon - Fri: 11 AM - 10 PM</p>
          <p className="text-gray-600">Sat - Sun: 10 AM - 11 PM</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
