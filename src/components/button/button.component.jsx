import React from 'react';

import "./button.styles.css";

export const BUTTON_TYPE_CLASSES = {
    primary: "primary",
    hollow: "hollow",
    tiny: "tiny",
    cart: "add-to-cart",
    bigPrimary: "big-primary",
   
  };


class Button extends React.Component {

render(){
const { children, buttonType, ...otherProps } = this.props;
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps} >
                {children}
        </button>
    );
}
}

export default Button;