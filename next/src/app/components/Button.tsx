'use client'
import React, { useState } from 'react';

const Button: React.FC<
{ onClick: (event: any) => void, onDrag: (event: any) => void,
area: number}> = ({onClick, onDrag, area}) => {
  const styles:any=[{position:"absolute",left:"100px", top:"100px"},
                {position:"absolute",right:"100px", top:"100px"},
                {position:"absolute",right:"100px", bottom:"100px"},
                {position:"absolute",left:"100px", bottom:"100px"}]

//const [area,Setarea] = useState(0);
  
  return (<button
      onClick={onClick}
      draggable={true}
      onDragEnter={onDrag}
      style={styles[area]}
      >
    Drag or Click
    </button>);
};

export default Button;
