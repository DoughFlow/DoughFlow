import React, { useState } from "react";
import { Rnd } from "react-rnd";
import Image from "next/image";
import buttonNormal from "@/buttonNormal.png";
import buttonHovered from "@/buttonHovered.png";

const Button: React.FC<{ onClick: (event: any) => void}> = ({onClick}) => {

  const [hovered, setHovered] = useState(buttonNormal);
  const resize_config = { top:false, right:false, bottom:false, left:false,
        topRight:false, bottomRight:false, bottomLeft:false, topLeft:false };

  return (

  <Rnd dragHandleClassName="handle" cancel=".cancel-drag"
    default = {{x: 50, y: 50, width: 350, height: 275}}
    enableResizing={resize_config}
  >
    <div className="handle w-full h-full flex justify-center items-center
                    cursor-move" >
      <div className="cancel-drag cursor-pointer" onClick={onClick}>
        <Image width={105} height={85} src={ hovered } alt={"click me"}
          onMouseEnter={() => { setHovered(buttonHovered);}}
          onMouseLeave={() => { setHovered(buttonNormal);}} />
      </div>
    </div>
  </Rnd>
      
  );
};

export default Button;