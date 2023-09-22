import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LogOutModal = ({
  isOpen,
  onRequestClose,
  setIsAuthenticated
  
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate("/")
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="relative w-auto max-w-lg p-4 mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={onRequestClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">
            {" "}
            Are you sure you wan to Logout?
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Click the Ok button to Log Out
          </p>
          <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              type="primary"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
