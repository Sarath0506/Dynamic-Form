import React from "react";

const Modal = ({
  isOpen,
  title,
  inputValue = "",
  onInputChange,
  showInput = false,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        {showInput && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            className="w-full mt-4 p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
