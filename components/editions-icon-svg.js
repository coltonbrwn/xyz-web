import React from 'react';

let SVG;

export default props => (
    <span 
        dangerouslySetInnerHTML={{ __html: SVG(props) }}
    />
);

SVG = props => `
    <svg viewBox="0 0 84 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="19.5" fill="#ECECEC" stroke="#B7B7B7" stroke-width="3"/>
    <circle cx="35" cy="21" r="19.5" fill="#ECECEC" stroke="#B7B7B7" stroke-width="3"/>
    <circle cx="49" cy="21" r="19.5" fill="#ECECEC" stroke="#B7B7B7" stroke-width="3"/>
    <circle cx="63" cy="21" r="19.5" fill="#ECECEC" stroke="#B7B7B7" stroke-width="3"/>
    </svg>
`