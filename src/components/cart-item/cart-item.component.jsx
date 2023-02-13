import { Component } from 'react';

import { connect } from 'react-redux/es/exports';

import CartItemLeft from '../cart-item-left/cart-item-left.component';
import CartItemRight from '../cart-item-right/cart-item-right.component';

import { increaseItemCount, decreaseItemCount } from '../../store/cartSlice';

import { getSelectedCurrencyDetails } from '../../utils/other.utils';


import './cart-item.styles.css';


class CartItem extends Component {

    render(){
        const { cartItem, uniqueAttributes, selected, normal, rightCartItemStyle, leftCartItemStyle, selectedCurrency } = this.props;
        
        const selectedCurrencyDetails = getSelectedCurrencyDetails(cartItem.prices, selectedCurrency[1]);
        
        return(
            <div className={this.props.theClass}>
                <CartItemLeft 
                cartItem={cartItem} 
                uniqueAttributes={uniqueAttributes} 
                rightCartItemStyle={rightCartItemStyle} 
                leftCartItemStyle={leftCartItemStyle} 
                selectedCurrency={selectedCurrencyDetails} 
                selected={selected} 
                normal={normal}  />

                <CartItemRight 
                selectedCurrency={selectedCurrency} 
                rightCartItemStyle={rightCartItemStyle} 
                leftCartItemStyle={leftCartItemStyle} 
                theProps={this.props} /> 
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        increaseItemCount:(ownProps) => dispatch(increaseItemCount(ownProps)),
        decreaseItemCount:(ownProps) => dispatch(decreaseItemCount(ownProps)),
    }
};

const mapStateToProps = (state) => {
    const { currencies, selectedCurrency } = state.currencySlice;

    return {
        currencies,
        selectedCurrency,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);