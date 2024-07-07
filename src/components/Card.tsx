import React, { useState } from 'react';
import styled from 'styled-components';
import { Document } from '../types/Document';
import Spinner from './Spinner';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
`;

interface CardProps extends Document {
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, type, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const thumbnailSrc = `https://cataas.com/cat?${type}`;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  console.log('card container');
  return (
    <CardContainer>
      <Title>{title}</Title>
      {isLoading && <Spinner />}
      <Thumbnail
        src={thumbnailSrc}
        alt={title}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </CardContainer>
  );
};

export default Card;
