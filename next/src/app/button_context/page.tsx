"use client"
import React, { useState } from 'react';
import VisualizationContext from '../components/VisualizationContext';
import Search from '../components/Search';
import Controller from '../components/Controller';
import Button from '../components/Button';

import { useGlobal } from '../components/GlobalContextProvider';

const ButtonContext = () => {

  const { stocks } = useGlobal(); 
  const [menu, setMenu] = useState(true);

  const onClick = (event: any) => {setMenu(!menu);}
  
  const svg = stocks.at(0)?.svgs?.['6m']
  
  return(
    <div>
      <div className="fixed" dangerouslySetInnerHTML={{ __html: svg || '' }} />
      {menu ? 
      <div className="text-red-500">
      <Button onClick={onClick} posn_x={25} posn_y={25} />
      </div> :
      <div className="absolute top-0 left-0 w-64 bg-yellow-500 z-50">
      <VisualizationContext  onClick={onClick}/></div>}
    </div>
    );
};
export type Enable = {
  bottom?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  topLeft?: boolean;
  topRight?: boolean;
} | boolean
export default ButtonContext;
