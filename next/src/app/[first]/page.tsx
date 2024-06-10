"use client"
import React, { useEffect } from "react";
//import List from "@C/List";
//import Button from "@C/Button";
import { useStocks } from "@C/StockContext";
import Visualization from "@C/Visualization";

const Page = ({ params }: { params: {first:string } }) => {

  const { initStock } = useStocks();

  useEffect(() => {
    if (params.first) {
      initStock(params.first);
    }
  }, [params.first]);

  return (<div>
            { params.first }
          </div>
         );

}

export default Page;
