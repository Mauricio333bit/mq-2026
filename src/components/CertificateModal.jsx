import React from 'react';

const CertificateModal = ({ isOpen, onClose, certPath, certTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{certTitle}</h3>
          <button className="modal-close" onClick={onClose}>[ X ]</button>
        </div>
        <div className="modal-body">
          <iframe 
            src={`${certPath}#toolbar=0`} 
            title={certTitle}
            width="100%" 
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;