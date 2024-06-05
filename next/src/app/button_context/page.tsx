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
      <div dangerouslySetInnerHTML={{ __html: svg || '' }} />
      {menu ? <Button onClick={onClick} onDrag={onDrag}area={area}/> :
      <VisualizationContext  onClick={onClick}/>}
    </div>
    );
};

export default ButtonContext;
