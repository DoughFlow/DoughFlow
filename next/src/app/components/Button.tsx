'use client'
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const resize_config = { top:false, right:false, bottom:false,
            left:false, topRight:false, bottomRight:false, 
            bottomLeft:false, topLeft:false };


const Button: React.FC<
{ onClick: (event: any) => void, posn_x: number, posn_y: number}> = 
({onClick, posn_x, posn_y}) => {

//const [area,Setarea] = useState(0);
 /** 
  return (
    <Rnd>
      <div className="bg-white">
        <button onClick={onClick}>
          Drag or Click
        </button>
      </div>
    </Rnd>);
**/
return (<Rnd
  dragHandleClassName="handle"
  cancel=".cancel-drag"
  default={{
    x: 55, y: 55, width: 115, height: 65
  }}
  enableResizing={resize_config}
  >
  <div>
    <div className="handle">Drag from here</div>
    <div className="cancel-drag">
      <button className="text-center" onClick={onClick}>
        button
      </button>
    </div>
  </div>
</Rnd>);



};

export default Button;
