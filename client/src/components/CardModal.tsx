import React from 'react';

interface CardModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSave: (desc: string) => void;
}

export const CardModal: React.FC<CardModalProps> = ({ isOpen, title, description, onClose, onSave }) => {
  const [desc, setDesc] = React.useState(description);

  React.useEffect(() => {
    setDesc(description);
  }, [description]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320 }}>
        <h2>{title}</h2>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Add a description..."
          style={{ width: '100%', minHeight: 80, marginBottom: 16 }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onSave(desc)}>Save</button>
        </div>
      </div>
    </div>
  );
};
