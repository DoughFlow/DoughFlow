import React from 'react';

interface PencilProps {
    onClick: () => void;
}


const Pencil = ({ onClick }: PencilProps) => {
    return (
    <div className='cursor-pointer' onClick={onClick}>
      Pencil
    </div>
    );
};

export default Pencil;
