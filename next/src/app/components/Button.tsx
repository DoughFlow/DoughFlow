import React from 'react';
import { Rnd } from 'react-rnd';

const Button: React.FC<{ onClick: (event: any) => void}> = ({onClick}) => {

  return (<Rnd dragHandleClassName="handle" cancel=".cancel-drag"
            default = {{x: 55, y: 55, width: 115, height: 65}}
            enableResizing={resize_config} >

            <p className="handle bg-gray-500 text-right outline-dotted">
              Drag Area
            </p>
            <div className="cancel-drag text-center bg-green-700">
              <button onClick={onClick}>
                Durg Burton
              </button>
            </div>    
          </Rnd>
        );

};

const resize_config = { top:false, right:false, bottom:false,
            left:false, topRight:false, bottomRight:false, 
            bottomLeft:false, topLeft:false };

export default Button;
