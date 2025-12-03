import { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
  duration?: number;
}

const SuccessNotification = ({ message, onClose, duration = 3000 }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "16px 24px",
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: "20px" }}>✓</span>
      <span style={{ fontWeight: "500" }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
          padding: "0",
          marginLeft: "8px",
        }}
      >
        ×
      </button>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SuccessNotification;