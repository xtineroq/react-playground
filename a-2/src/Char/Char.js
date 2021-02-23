import React from 'react';
import './Chars.css';

const char = (props) => {
    let chars = props.userInput.split('');

    return (
        <div>
            {chars.map((singleChar, index) => {
                return <div key={index} className='char' onClick={() => props.onClick(index)}>{singleChar}</div>
            })}
        </div>
    )

}

export default char;
