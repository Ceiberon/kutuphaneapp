import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Kapat</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
