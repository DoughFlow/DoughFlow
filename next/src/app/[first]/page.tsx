"use client"
import React, { useEffect, useState } from "react";
import List from "@C/List";
import Button from "@C/Button";
import { useStocks } from "@C/StockContext";
import Visualization from "@C/Visualization";

const Page = ({ params }: { params: {first:string } }) => {

  const [menu, setMenu] = useState(true);
  const { initStock, updateStock } = useStocks();
  
  const onClick = (event: any) => {setMenu(!menu)};
  const onClose = (event: any) => {setMenu(true)};

  useEffect(() => {
    if (params.first) {
      initStock(params.first);
    }
  }, [params.first]);

  return (

  <div>
    <div className="absolute z-50">
      { menu ?
          <Button onClick={onClick} />
        : 
          <List />
      }
    </div>
    <div onClick={onClose}>
      <Visualization />
    </div>
  </div>
    
  );
}

export default Page;
