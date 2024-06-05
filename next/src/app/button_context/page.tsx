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
  const [area, setArea] = useState(0);

  const onClick = (event: any) => {setMenu(!menu);}
  const onDrag = (event: any) => {if (area < 3)
    {setArea(area+1);} else {setArea(0);}};
  
  const svg = stocks.at(0)?.svgs?.['6m']
  
  return(
    <div>
      <div className="fixed" dangerouslySetInnerHTML={{ __html: svg || '' }} />
      {menu ? 
      <div className="text-red-500">
      <Button onClick={onClick} onDrag={onDrag}area={area}/>
      </div> :
      <div className="absolute top-0 left-0 w-64 bg-yellow-500 z-50">
      <VisualizationContext  onClick={onClick}/></div>}
    </div>
    );
};

export default ButtonContext;
