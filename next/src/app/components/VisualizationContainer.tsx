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

const VisualizationContainer = () => {
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [showI, setShowI] = useState<boolean>(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const searchBarRef = useRef<HTMLDivElement>(null);
    const iRef = useRef<HTMLDivElement>(null);
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

    const clearSearch = () => {
        setShowSearchBar(false);
    };
    
    const clearI = () => {
        setShowI(false);
    };


    const handleAddStock = () => {
        const aStock = {
            ticker: "Googler",
            indicator: "Poonsex",
            position: "sixty nine"
        };
        addStock(aStock);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                clearSearch();
            }
            if (iRef.current && !iRef.current.contains(event.target)) {
                clearI();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            <div>
                <GraphElement />
            </div>
            <button onClick={toggleSearchBar} className="btn">
                Toggle Search
            </button>
        </div>
    );
};

export default VisualizationContainer;

const HoverSearch = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className='hover-search fixed left-0 top-0  bg-dfwhite rounded p-2 m-2'>
            <input ref={inputRef} type='text' className='pl-7 focus:outline-none text-dfbrown rounded w-full' />
        </div>
    );
};

