import React from "react";
import {
  FaUtensils,
  FaHandshake,
  FaStar,
  FaHome,
  FaPeopleCarry,
} from "react-icons/fa";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="container mx-auto mt-10 px-4 py-8"
      style={{
        backgroundImage: "url('/images/backgrounds/pizza-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for readability
        borderRadius: "10px", // Rounded corners
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-6 text-black drop-shadow-lg">
        About Us
      </h2>
      <div className="mb-6 text-lg text-black drop-shadow-md leading-relaxed tracking-wide">
        <p className="mb-4">
          Welcome to{" "}
          <span className="font-semibold text-red-500">Foodie's Paradise</span>,
          where each meal is a celebration of flavor! Our restaurant combines
          culinary artistry with the finest ingredients to create unforgettable
          dining experiences that tantalize your taste buds and warm your heart.
        </p>
        <p>
          Nestled in the vibrant heart of the city, our diverse pizza menu
          caters to every palate, featuring everything from timeless classics to
          adventurous creations. Each dish is crafted with passion and
          creativity, ensuring a delightful experience for every guest.
        </p>
      </div>
      <div className="mb-6 text-lg text-black drop-shadow-md leading-relaxed tracking-wide">
        <p className="mb-4">
          Our dedicated chefs and friendly staff work tirelessly to ensure that
          every visit is exceptional. Enjoy the perfect pairing of delicious
          food and remarkable service that leaves you with lasting memories.
        </p>
        <p>
          Join us at{" "}
          <span className="font-semibold text-red-500">Foodie's Paradise</span>,
          where warm ambiance and special moments await you, whether you’re
          gathering with family, celebrating with friends, or sharing a romantic
          dinner. Let us make your dining experience truly special!
        </p>
      </div>

      <div className="mt-8 text-center bg-white bg-opacity-80 rounded-lg p-6">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Values
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center p-4 bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300">
            <FaUtensils className="text-4xl text-green-500 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                Quality Ingredients
              </h4>
              <p className="text-gray-600">
                We source the freshest ingredients for every dish.
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300">
            <FaHandshake className="text-4xl text-blue-500 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                Exceptional Service
              </h4>
              <p className="text-gray-600">
                Our staff is dedicated to providing top-notch service.
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300">
            <FaStar className="text-4xl text-yellow-500 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                Innovative Cuisine
              </h4>
              <p className="text-gray-600">
                Experience creative dishes that excite your palate.
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300">
            <FaHome className="text-4xl text-red-500 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                Welcoming Atmosphere
              </h4>
              <p className="text-gray-600">
                Enjoy a cozy and inviting dining experience.
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300">
            <FaPeopleCarry className="text-4xl text-purple-500 mr-4" />
            <div>
              <h4 className="text-xl font-semibold text-gray-800">
                Community Engagement
              </h4>
              <p className="text-gray-600">
                We believe in giving back to our local community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
