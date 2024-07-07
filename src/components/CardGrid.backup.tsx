import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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

const CardGrid: React.FC<CardGridProps> = ({ documents, onReorder, onCardClick }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      position: index,
    }));

    onReorder(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <Grid {...provided.droppableProps} ref={provided.innerRef}>
            {documents.map((document, index) => (
              <Draggable key={document.id} draggableId={document.id} index={index}>
                {(provided, snapshot) => (
                  <DraggableItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      background: snapshot.isDragging ? 'lightblue' : 'white',
                    }}
                  >
                    <div onClick={() => onCardClick(document)}>
                      <Card {...document} onClick={() => {}} />
                    </div>
                  </DraggableItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardGrid;
