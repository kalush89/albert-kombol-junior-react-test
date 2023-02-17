import { Component } from "react";

import SwatchPicker from '../swatch-picker/swatch-picker.component';
import TextAttributePicker from '../text-attribute-picker/text-attribute-picker.component';

import { compare } from "../../utils/other.utils";

import "./cart-item-left.styles.css";

class CartItemLeft extends Component {

    render(){
        const { cartItem, uniqueAttributes, selectedCurrency, selected, normal, leftCartItemStyle } = this.props;
        const { id, brand, name, attributes } = cartItem;
        return(
            <div className={leftCartItemStyle}>
                    <div className='product-name'>
                        <span className='brand'>
                            {brand}
                        </span>
                        <span className='name'>
                            {name}
                        </span>
                    </div>
                    
                    <div className='product-price'>
                       
                            {
                                selectedCurrency[0].currency.symbol
                            }
                        
                            {
                                selectedCurrency[0].amount.toFixed(2)
                            }
                        
                    </div>
                    {attributes.slice(0).sort(compare).map(attribute =>(
                        <div key={attribute.id} className={`product-${attribute.id.toLowerCase()}`}>
                        <div className={`${attribute.id.toLowerCase()}-label`}>{attribute.id}</div>
                        <div className={`${attribute.id.toLowerCase()}-picker`}>
                            
                                {attribute.items.map(item => (
                                    
                                    attribute.type === 'swatch'?
                                        <SwatchPicker 
                                            key={item.id} 
                                            theProductId={id} 
                                            attributeId={attribute.id} 
                                            value={item.value} 
                                            uniqueAttributes={uniqueAttributes} 
                                            selected={selected} 
                                            normal={normal}
                                        />
                                        : 
                                        <TextAttributePicker 
                                            key={item.id} 
                                            theProductId={id} 
                                            attributeId={attribute.id} 
                                            value={item.value} 
                                            uniqueAttributes={uniqueAttributes} 
                                            selected={selected} 
                                            normal={normal}
                                        /> 
                                        
                                ))}

                             </div>
                        </div>
                    ))}
                   
                    
                </div>
        )
    }
}

export default CartItemLeft;