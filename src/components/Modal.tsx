import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <div className={`${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300`}>
      
      <div style={{ opacity: isOpen ? 1 : 0 }} className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
      
      <div className={`${isOpen ? 'scale-100' : 'scale-95'} bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg z-10 transform transition-transform duration-300`}>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-500 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {children}
      </div>
      
    </div>
  );
};

export default Modal;