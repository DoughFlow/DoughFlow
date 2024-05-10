import React from 'react';

interface HoverSearchProps {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const HoverSearch: React.FC<HoverSearchProps> = ({ onMouseEnter, onMouseLeave }) => {
    return (
    <div
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
    >
            {/* Insert content for HoverSearch here */}
            HoverSearch
    </div>
    );
};
export default HoverSearch;
