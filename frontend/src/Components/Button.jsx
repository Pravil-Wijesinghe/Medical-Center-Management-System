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