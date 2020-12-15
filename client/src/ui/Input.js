import React, { Fragment } from 'react';
import checkValidity from '../utility/checkValidity';

const Input = props => {
    let isFirstTime = true;
    const validationHandler = ({ target }) => {
        isFirstTime = false;
        checkValidity(target);
    }
    const onChange = e => {
        (!isFirstTime || e.target.classList.contains('__invalid')) && validationHandler(e);
        props.onChange && props.onChange(e);
    }
    return (
        <Fragment>
            <input className='__input __full' {...props} onBlur={validationHandler} onChange={onChange} />
            <div className='__error'>{props.error}</div>
        </Fragment>
    )
}

export default Input;