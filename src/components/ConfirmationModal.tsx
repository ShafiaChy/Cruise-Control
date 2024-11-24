import React from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-transparent  hover:border-transparent text-gray-400 hover:text-gray-900"
            onClick={onCancel}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center">
          <FaExclamationCircle className="w-16 h-16 text-red-600 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">
            {message}
          </h3>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white py-2 px-4 rounded-none focus:outline-none hover:border-red-700 hover:bg-red-700"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-none focus:outline-none hover:bg-gray-300 hover:border-gray-300"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
