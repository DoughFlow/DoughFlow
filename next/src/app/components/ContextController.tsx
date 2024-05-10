'use client'
import React from "react";
import { useGlobal } from "./GlobalContext";

const ContextController = () => {
    const { stocks, editFirstIndicator, editFirstPosition, editSecondIndicator, editSecondPosition } = useGlobal();

    const topBottomFormat = () => {
        editFirstPosition('top');
        editSecondPosition('bottom');
    };
    const leftRightFormat = () => {
        editFirstPosition('left');
        editSecondPosition('right');
    };


    return (
        <div id="side-bar" className="border border-b-dfyellow p-4 rounded-xl">
            <div className="flex flex-row">
                <div className="flex-1">
                    <div className="text-xl">{stocks.ticker1}</div>
                    <p>content</p>
                </div>
                <div className="flex flex-col flex-1">
                    <button onClick={() => editFirstIndicator("vol")}
                        className="bg-dfbrown p-2 m-1 rounded"
                    >
                        VOL
                    </button>
                    <button onClick={() => editFirstIndicator("rsi")}
                        className="bg-dfbrown p-2 m-1 rounded"
                    >
                        RSI
                    </button>
                    <button onClick={() => editFirstIndicator("sma")}
                        className="bg-dfbrown p-2 m-1 rounded"
                    >
                        SMA
                    </button>
                </div>
            </div>

            {stocks.ticker2 && (
                <>
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <div className="text-xl">{stocks.ticker2}</div>
                            <p>content</p>
                        </div>
                        <div className="flex flex-col flex-1">
                            <button onClick={() => editSecondIndicator("vol")}
                                className="bg-dfbrown p-2 m-1 rounded"
                            >
                                VOL
                            </button>
                            <button onClick={() => editSecondIndicator("rsi")}
                                className="bg-dfbrown p-2 m-1 rounded"
                            >
                                RSI
                            </button>
                            <button onClick={() => editSecondIndicator("sma")}
                                className="bg-dfbrown p-2 m-1 rounded"
                            >
                                SMA
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-col">
                <p className="text-xl">Layout:</p>
                <div className="flex flex-col rounded border border-b-dfyellow m-1 p-0.5 h-24"
                    onClick={topBottomFormat}
                >
                    <div className="rounded bg-dfbrown m-1 mb-0.5 h-full">
                    </div>

                    <div className="rounded bg-dfbrown m-1 mt-0.5 h-full">
                    </div>
                </div>

                <div className="flex flex-row rounded border border-b-dfyellow m-1 p-0.5 h-24"
                    onClick={leftRightFormat}
                >
                    <div className="rounded bg-dfbrown m-1 mr-0.5 w-full">
                    </div>

                    <div className="rounded bg-dfbrown m-1 ml-0.5 w-full">
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ContextController;
