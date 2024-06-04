"use client"
import React from 'react';
import VisualizationContext from '../components/VisualizationContext';
import Search from '../components/Search';
import Controller from '../components/Controller';
import { useGlobal } from '../components/GlobalContextProvider';


const Context = () => {
  const { stocks } = useGlobal();
  const svg = stocks.at(0)?.svg
    return (
      <div className=''>
        <Controller />
        <VisualizationContext/>
        <div dangerouslySetInnerHTML={{ __html: svg || '' }} />
      </div>
    );
};

export default Context;
