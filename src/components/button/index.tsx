import React from "react";
import './style.scss'

type Props = {
    children: React.ReactNode
    onClick?: React.MouseEventHandler
};

function Button({ children, onClick }: Props) {
    return (
        <button
            className='button'
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
