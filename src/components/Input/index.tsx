'use client';
import { forwardRef } from 'react'

function Input({ id, label, placeholder, type, error, children, ...rest }, ref) {

    return (
        <fieldset>
            <legend>{label}</legend>
            <input placeholder={placeholder} type={type} id={id}
                ref={ref} {...rest} />
            <span>{error}</span>
            {children}
        </fieldset>
    )
};

export default forwardRef(Input);