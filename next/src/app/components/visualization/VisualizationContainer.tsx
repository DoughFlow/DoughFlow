'use client'
import React, { useState } from 'react';
import GraphTemplate from '@/components/visualization/GraphTemplate';
import HoverSearch from '@/components/visualization/HoverSearch';
import HoverableHelper from '@/components/visualization/HoverableHelper';
import VisualizationTooltip from '@/components/visualization/VisualizationTooltip';

const VisualizationContainer = (
    {ticker, ticker2, temp}:
    {ticker: string, ticker2: string, temp: string}) => {
    
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleHoverOut = () => {
        setIsHovered(false);
    };

   return (
        <div className="h-1/2">
        <div className="relative bg-gray-200 rounded-lg shadow-xl p-8">
            <div className="absolute top-0 left-0">
                <HoverSearch onMouseEnter={handleHover} onMouseLeave={handleHoverOut} />
            </div>
            
            {isHovered && (
                <div className="absolute top-10 left-10">
                    <VisualizationTooltip />
                </div>
            )}
            
            <div className="absolute top-0 right-0">
                <HoverableHelper />
            </div>

            <GraphTemplate {...{ticker, ticker2, temp}} />
        </div>
        </div>
    );
}

export default VisualizationContainer;
