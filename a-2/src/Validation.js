import React from 'react';

const validation = (props) => {

    let validateText = props.length;
    let validationText;

    if (validateText >= 5) {
        validationText = 'Text long enough.'
    } else {
        validationText = 'Text too short.'
    }

    return (
        <p>{validationText}</p>
    )
}

export default validation;