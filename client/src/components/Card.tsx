import React, { useState } from 'react';
import { updateCard } from '../api';
import { useDrag } from 'react-dnd';
import { ItemTypes, type Card as CardType } from '../types';
import { CardModal } from './CardModal';

type Props = {
  card: CardType;
  listId: string;
  onDelete?: () => void;
};

function CardComponent({ card, listId, onDelete }: Props, ref: React.Ref<HTMLLIElement>) {
  // Debug log to check card prop
  console.log('Card component received card:', card);
  const [modalOpen, setModalOpen] = useState(false);
  const [desc, setDesc] = useState(card.description || '');

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: card.id, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const listIdToColumn = (id: string) => {
    switch (id) {
      case 'backlog': return 0;
      case 'todo': return 1;
      case 'inprogress': return 2;
      case 'done': return 3;
      default: return 0;
    }
  };

  const handleSave = async (newDesc: string) => {
    setDesc(newDesc);
    setModalOpen(false);
    try {
      await updateCard({
        id: card.id,
        title: card.title,
        column: listIdToColumn(listId),
        description: newDesc
      });
    } catch (err) {
      console.error('Failed to update card description', err);
    }
  };

  return (
    <>
      <li
        ref={(node) => {
          drag(node);
          if (typeof ref === 'function') ref(node);
          else if (ref && typeof ref === 'object' && ref !== null) (ref as React.MutableRefObject<HTMLLIElement | null>).current = node;
        }}
        className="card-item"
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        onClick={() => setModalOpen(true)}
      >
        <span>{card.title}</span>
        {onDelete && (
          <button
            type="button"
            className="card-delete-btn"
            onClick={(e) => { e.stopPropagation(); if (onDelete) onDelete(); }}
            aria-label={`Delete card ${card.title}`}
          >
            ✕
          </button>
        )}
      </li>
      <CardModal
        isOpen={modalOpen}
        title={card.title}
        description={desc}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

export const Card = React.forwardRef<HTMLLIElement, Props>(CardComponent);
Card.displayName = 'Card';
