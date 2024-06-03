"use client"
import React from 'react';
import VisualizationContext from '../components/VisualizationContext';
import Search from '../components/Search';
import Controller from '../components/Controller';


const Context = () => {
    return (
      <div className=''>
        <Controller />
        <VisualizationContext/>
      </div>
    );
};

export default Context;
