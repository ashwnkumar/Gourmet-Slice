import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [image, setImage] = useState(user?.profileImage || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Early return if no file is selected

    setSelectedFile(file); // Set the selected file
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);
    setError(null); // Reset error state before the request

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/profile-image",
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${user.token}`, // Include token in the request
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        updateUser({ ...user, profileImage: data.image }); // Update the user context with the new image
        setImage(data.image); // Set the local state for the image
        setSelectedFile(null); // Reset selected file
        setShowConfirmation(false); // Hide the confirmation dialog
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Failed to update profile image"); // Show error message
        console.error("Failed to update profile image:", errorData);
      }
    } catch (error) {
      setError("Error uploading image: " + error.message); // Set error state
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelUpload = () => {
    setSelectedFile(null); // Reset selected file
    setShowConfirmation(false); // Hide the confirmation dialog
  };

  useEffect(() => {
    setImage(user?.profileImage || ""); // Update local state when user changes
  }, [user]);

  // Normalize the image URL
  const imageUrl =
    image && image.startsWith("http")
      ? image
      : `http://localhost:5000/${image}`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        {user ? (
          <>
            <img
              src={imageUrl || "/path/to/default/image.jpg"} // Fallback image if none
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4"
            />
            {loading && <p>Uploading image...</p>}
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error messages */}
          </>
        ) : (
          <p>Loading...</p>
        )}
        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Confirm Image Upload</h3>
              <p className="mb-4">
                Are you sure you want to upload this image?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelUpload}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpload}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
