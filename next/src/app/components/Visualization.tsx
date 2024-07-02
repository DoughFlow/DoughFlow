import React, { useRef, useEffect, useState } from 'react';
import { useStocks } from "@C/StockContext";

interface CrosshairState {
  x: number;
  y: number;
  visible: boolean;
}

const Visualization: React.FC = () => {
  const { stocks } = useStocks();
  const crosshairRef = useRef<SVGSVGElement>(null);
  const [crosshair, setCrosshair] = useState<CrosshairState>({ x: 0, y: 0, visible: false });

  const renderStockSVG = (index: number) => {
    if (index < stocks.length && stocks[index] && stocks[index].svg) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: stocks[index].svg || "" }}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          className="relative z-0"
        />
      );
    }
    return null; // Return null or some fallback component if stock doesn't exist
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + e.currentTarget.offsetLeft;
    const y = e.clientY - rect.top + e.currentTarget.offsetTop;
    setCrosshair({ x, y, visible: true });
  };

  const handleMouseEnter = () => {
    setCrosshair((prevState) => ({ ...prevState, visible: true }));
  };

  const handleMouseLeave = () => {
    setCrosshair((prevState) => ({ ...prevState, visible: false }));
  };

  useEffect(() => {
    if (crosshairRef.current) {
      const { x, y, visible } = crosshair;
      const display = visible ? 'block' : 'none';

      const verticalLine = crosshairRef.current.querySelector('.vertical-line') as SVGLineElement;
      const horizontalLine = crosshairRef.current.querySelector('.horizontal-line') as SVGLineElement;

      if (verticalLine) {
        verticalLine.setAttribute('x1', x.toString());
        verticalLine.setAttribute('x2', x.toString());
        verticalLine.setAttribute('y1', '0');
        verticalLine.setAttribute('y2', '100%');
      }

      if (horizontalLine) {
        horizontalLine.setAttribute('x1', '0');
        horizontalLine.setAttribute('x2', '100%');
        horizontalLine.setAttribute('y1', y.toString());
        horizontalLine.setAttribute('y2', y.toString());
      }

      crosshairRef.current.style.display = display;
    }
  }, [crosshair]);

  return (
    <div className="flex flex-col min-h-screen min-w-screen m-0 select-none relative">
      <div className="flex flex-row">
        {renderStockSVG(0)}
        {renderStockSVG(3)}
      </div>

      <div className="flex flex-row">
        {renderStockSVG(1)}
        {renderStockSVG(2)}
        {renderStockSVG(4)}
      </div>

      <svg ref={crosshairRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-1">
        <line className="vertical-line" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
        <line className="horizontal-line" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    </div>
  );
}

export default Visualization;
