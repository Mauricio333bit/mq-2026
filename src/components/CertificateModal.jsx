import { createPortal } from "react-dom";
import { useEffect } from "react";

const CertificateModal = ({ isOpen, onClose, certPath, certTitle }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-landscape");
    } else {
      document.body.classList.remove("modal-landscape");
    }
    return () => document.body.classList.remove("modal-landscape");
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{certTitle}</h3>
          <button className="modal-close" onClick={onClose}>[ X ]</button>
        </div>
        <div className="modal-body">
          <iframe src={`${certPath}#toolbar=0&zoom=page-width`} title={certTitle} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CertificateModal;