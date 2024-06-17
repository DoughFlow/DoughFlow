"use client"
import UI from "@C/UI";
import Visualization from "@C/Visualization";
import { useStocks } from "@C/StockContext";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: {first:string } }) => {

  /* State and Context */
  const { initStock } = useStocks();
  const [editState, setEditState] = useState(false);
  
  /* UI state methods */
  const openUI = () => { setEditState(true) ;}
  const closeUI = () => { setEditState(false);}
 
  /* Populate Initial Visualization (w/ first stock in Stock[]) */
  useEffect(() => {
    if (params.first) { initStock(params.first); }
  }, [params.first]);


  return (
  <div>
    {/* UI opens on button click */}
    <div className="absolute">
      <UI editor={editState} click={openUI}/>
    </div>

    {/* UI closes on any click inside Vis. */}
    <div onClick={closeUI}>
      <Visualization />
    </div>
  </div>
  );

}

export default Page;
