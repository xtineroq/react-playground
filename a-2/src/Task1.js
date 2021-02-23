import React from 'react';

const task1 = (props) => {

    return(
        <div>
            <p>{props.userInput.length}</p>
            <input type="text" onChange={props.changed} value={props.userInput} />
        </div>
    )
}

export default task1;