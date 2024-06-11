"use client"
import React, { useEffect, useState } from "react";
//import List from "@C/List";
import Button from "@C/Button";
import { useStocks } from "@C/StockContext";
import Visualization from "@C/Visualization";

const Page = ({ params }: { params: {first:string } }) => {

  const [menu, setMenu] = useState(false);
  const { initStock } = useStocks();
  
  const onClick = (event: any) => {setMenu(!menu)};

  useEffect(() => {
    if (params.first) {
      initStock(params.first);
    }
  }, [params.first]);

  return (
  <div>
    <div>
      { menu ?
        <div className="absolute top-0 left-0 z-50  text-red-500">
          <Button onClick={onClick}/>
        </div> 
        : 
        <div className="absolute bg-yellow-500 z-50">
          <div className="text-5xl">text</div>
        </div>
      }
    </div>
    <div onClick={onClick}>
      <Visualization />
    </div>
  </div>
    );

}

export default Page;
