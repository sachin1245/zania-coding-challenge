import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { Document } from '../types/Document';
import Card from './Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const DraggableItem = styled.div`
  cursor: grab;
  user-select: none;
  margin-bottom: 8px;
`;

interface CardGridProps {
  documents: Document[];
  onReorder: (newOrder: Document[]) => void;
  onCardClick: (document: Document) => void;
}

interface DraggableCardProps {
  id: string;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
  document: Document;
  onCardClick: (document: Document) => void;
}

// DraggableCard Component
const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  index,
  moveCard,
  onCardClick,
  document,
}) => {
  const [, ref] = useDrag({
    type: 'CardDrag',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'CardDrag',
    hover: (draggedItem: { index: number }, monitor: any) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <DraggableItem ref={(node) => ref(drop(node))}>
      <div onClick={() => onCardClick(document)}>
        <Card {...document} onClick={() => {}} />
      </div>
    </DraggableItem>
  );
};

const CardGrid: React.FC<CardGridProps> = ({ documents, onReorder, onCardClick }) => {
  const moveCard = (fromIndex: number, toIndex: number) => {
    const updatedCards = [...documents];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    onReorder(updatedCards);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Grid>
          {documents.map((document, index) => (
            <DraggableCard
              key={document.id}
              id={document.id}
              index={index}
              moveCard={moveCard}
              document={document}
              onCardClick={onCardClick}
            ></DraggableCard>
          ))}
        </Grid>
      </DndProvider>
    </>
  );
};

export default CardGrid;
