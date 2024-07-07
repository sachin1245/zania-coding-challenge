import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: center;
`;

const StatusText = styled.span`
  margin-left: 8px;
`;

interface SaveStatusProps {
  isSaving: boolean;
  lastSaveTime: number | null;
}

const SaveStatus: React.FC<SaveStatusProps> = ({ isSaving, lastSaveTime }) => {
  const getTimeSinceLastSave = () => {
    if (!lastSaveTime) return 'Never';
    const diff = Date.now() - lastSaveTime;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  return (
    <StatusContainer>
      {isSaving && <Spinner />}
      <StatusText>{isSaving ? 'Saving....' : `Last Saved: ${getTimeSinceLastSave()}`}</StatusText>
    </StatusContainer>
  );
};

export default SaveStatus;
