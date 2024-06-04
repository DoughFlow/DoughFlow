'use client'
import React, { useState } from 'react';

const Button = () => {
  const styles=[{position:"absolute",left:"100px", top:"100px"},
                {position:"absolute",right:"100px", top:"100px"},
                {position:"absolute",right:"100px", bottom:"100px"},
                {position:"absolute",left:"100px", bottom:"100px"}]

  const [area,Setarea] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleDrag = (event: React.DragEvent<HTMLButtonElement>) => {
    if (area < 3) {
      Setarea(area+1)} else {
      Setarea(0)}
  };

  const handleClick = (event: any) => {
    setClicked(!clicked)
  }
  
  return(clicked? null : (<button
      onClick={handleClick}
      draggable={true}
      onDragEnter={handleDrag}
      style={styles[area]}
      >
    Drag or Click
    </button>));
};

export default Button;
