"use client"
import { useState } from "react";
// import {Search, VisualizationContext, Controller, Button,
//         List, useGlobal, Stock } from "@C/DoughImports";

function GBC() {

  // states and context
  // const { stocks, getStockLayout } = useGlobal();
  const [menu, setMenu] = useState(true);

  // toggle between button and list editor with pencils & cans
  const onClick = (event: any) => {setMenu(!menu)};

  // return svgs
  // let svgExample = stocks.at(0);
  // const SVG = svgExample.svgs[svgExample.time as keyof typeof stock.svgs] as string;

  return (
  <div>
    <div>
      { menu ?
        <div className="absolute top-0 left-0 z-50  text-red-500">
          {/* <Button onClick={onClick}/> */}
        </div> 
        : 
        <div className="absolute bg-yellow-500 z-50">
          {/* <VisualizationContext onClick={onClick}/> */}
        </div>
      }
    </div>

    <div className="flex h-full flex-col m-0">
      <div className="flex flex-1">
        {/* <div className="flex-1 border-solid border-white border" dangerouslySetInnerHTML={{ __html: SVG || '' }} /> */}
        {/* <div className="flex-1 border-solid border-white border" dangerouslySetInnerHTML={{ __html: SVG || '' }} /> */}
      {/* </div> */}
      {/* <div className="flex flex-1"> */}
        {/* <div className="flex-1 border-solid border-white border" dangerouslySetInnerHTML={{ __html: SVG || '' }} /> */}
        {/* <div className="flex-1 border-solid border-white border" dangerouslySetInnerHTML={{ __html: SVG || '' }} /> */}
        {/* <div className="flex-1 border-solid border-white border" dangerouslySetInnerHTML={{ __html: SVG || '' }} /> */}
      </div>
    </div>
  </div>
  );
};

export default GBC;
