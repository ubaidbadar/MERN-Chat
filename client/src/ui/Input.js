import React, { Fragment } from 'react';
import checkValidity from '../utility/checkValidity';

const Input = props => {
    let isFirstTime = true;
    const validationHandler = ({ target }) => {
        isFirstTime = false;
        checkValidity(target);
    }
    const onInput = e => !isFirstTime && validationHandler(e);
    return (
        <Fragment>
            <input className='__input __full' {...props} onBlur={validationHandler} onInput={onInput} />
            <div className='__error'>{props.error}</div>
        </Fragment>
    )
}

export default Input;