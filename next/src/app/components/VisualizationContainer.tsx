'use client'
import GraphElement from '@components/GraphElement';
import { useGlobal } from '@components/GlobalContext';
import Image from 'next/image';
import SearchIcon from '@/search-white.svg';
import ResetIcon from '@/reset.png';
import HomeIcon from '@/home.png';
import PlusIcon from '@/plus.png';
import InfoIcon from '@/info.png';
import ContextController from './ContextController';
import { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import tickers from '@/comprehensive_stock_list.json';
import SearchFooter from '@/components/search/footer/SearchFooter';


const VisualizationContainer = () => {
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [showI, setShowI] = useState<boolean>(false);
    const [results, setResults] = useState<string[]>([]);
    const iconRef = useRef<HTMLDivElement>(null);
    const {stocks, clearStock, addStock} = useGlobal();

    const toggleSearchBar = () => {
        setShowSearchBar(prev => !prev);
        if (!showSearchBar && iconRef.current) {
            iconRef.current.focus();
        }
    };

    const toggleI = () => {
        setShowI(prev => !prev);
    };

    const clearPopups = () => {
        setShowSearchBar(false);
        setShowI(false);
        setResults([]);
    };
    


    const handleAddStock = () => {
        setShowSearchBar(true);
        const aStock = {
            ticker: "TSLA",
            indicator: "vol",
            position: "bottom"
        };
        addStock(aStock);
    };


    return (
        <div>
            {showSearchBar && <HoverSearch />}
            <div className='fixed right-0 top-12 w-1/6'>
                {showI && <ContextController />}
            </div>
                <div
                    ref={iconRef}
                    className='fixed left-0 p-2 m-2 hover:cursor-pointer'
                    onClick={toggleSearchBar}
                >
                    <Image
                        src={SearchIcon}
                        style={{ opacity: showSearchBar ? 0.5 : 1 }}
                        alt='Search Icon'
                        width={24}
                        height={24}
                        className='relative z-50 bg-dfbrown rounded rounded-l'
                    />
                </div>

                <div className="fixed right-0 pt-4 pr-7 flex flex-row items-center">
                    <button onClick={handleAddStock}>
                        <Image src={ PlusIcon } alt="Icon 1" 
                            className="w-[24px] h-[24px] p-0.5 mr-0.5 hover:cursor-pointer" />
                    </button>

                    <button onClick={clearStock}>
                        <Image src={ ResetIcon } alt="Icon 1" 
                            className="w-[24px] h-[24px] hover:cursor-pointer" />
                    </button>

                    <button id='side-bar' onClick={toggleI}>
                        <Image src={ InfoIcon } alt="Icon 1"
                            className="w-[24px] h-[24px] hover:cursor-pointer" />
                    </button>

                    <a href="/">
                    <Image src={ HomeIcon } alt="Icon 1"
                        className="w-[24px] h-[24px] hover:cursor-pointer" />
                    </a>
                </div>
            <div onClick={clearPopups}>
                <GraphElement />
            </div>
            <div className='fixed bottom-0 left-0'>
                <SearchFooter results={results} setResults={setResults}/>
            </div>
        </div>
    );
};

export default VisualizationContainer;

const HoverSearch = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const { addStock } = useGlobal();

    // Fuse.js setup for searching
    const fuse = new Fuse(tickers, {
        keys: ['path'],  // Adjust the keys according to the actual data structure in 'tickers'
        includeScore: true,
        threshold: 0.3
    });

    // Handle search logic
    const handleSearch = (query: string) => {
        setInput(query);
        if (query.trim()) {
            const searchResults = fuse.search(query);
            const mappedResults = searchResults.map(result => result.item);
            setResults(mappedResults.slice(0, 5));
        } else {
            setResults([]);
        }
    };

    const handleAddClick = (ticker:string) => {
        const selectedStock = {
            ticker: ticker,
            indicator: "vol", // You might need dynamic handling based on actual requirements
            position: "bottom" // Same as above
        };
        addStock(selectedStock);
    };

    // Focus on the search input field when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className='fixed top-0 left-0 bg-white p-2 m-2 w-fit'>
            <div className='relative'>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    className='pl-7 focus:outline-none text-dfbrown rounded-t w-full'
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Add stock tickers..."
                />
            </div>
            <div className='text-dfwhite bg-dfbrown rounded-b w-full'>
                {results && results.map((result, index) => (
                    <button key={index} className='text-left w-full' onClick={() => handleAddClick(result)}>
                        <div>{result}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
