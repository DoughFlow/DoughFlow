import React from 'react';

interface TrashProps {
  onClick: () => void;
}

const Trash = ({ onClick }: TrashProps) => {
    return (
    <div className='cursor-pointer' onClick={onClick}>
      Trash
    </div>
    );
};

export default Trash;
