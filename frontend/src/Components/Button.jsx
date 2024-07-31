// Code to create a button component that can be used in other components
import React from 'react'
import PropTypes from 'prop-types';

export const Button = ({children, ...Props}) => (
    <button {...Props}>
        {children}
    </button>
)

Button.propTypes = {
    children: PropTypes.node.isRequired,
}