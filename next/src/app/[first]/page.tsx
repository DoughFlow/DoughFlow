"use client"
import React, { useState } from "react";
//import List from "@C/List";
//import Button from "@C/Button";
import { useStocks } from "@C/StockContext";
import Visualization from "@C/Visualization";

const Page = ({ params }: { params: {first:string } }) => {



  return (<div>
            { params.first }
          </div>
         );

}

export default Page;
