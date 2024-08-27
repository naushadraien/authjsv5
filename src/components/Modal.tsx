import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70"
      onClick={handleBackdropClick}
    >
      <div className="p-5 bg-white rounded-lg w-4/5 max-w-screen-lg">
        <div className="flex justify-between items-center">
          <h2>{title}</h2>
          <Button onClick={onClose}>Close</Button>
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
