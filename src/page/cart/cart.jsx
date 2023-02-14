import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { setCartItemsTax } from "../../store/cartSlice";

import Button from "../../components/button/button.component";
import CartItem from "../../components/cart-item/cart-item.component";

import "./cart.styles.css";

class Cart extends Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    render(){
        
        const { cartItems, cartCount, cartTotal, selectedCurrency, tax } = this.props;

        return(
            <div className="large-cart-container">
                        <div className="cart-title">
                            <span>Cart</span>
                        </div>

                        <div className="cart-content">
                            {this.props.cartItems.length > 0 ? 
                                cartItems.slice(0).reverse().map((item, index) =>(
                                    <Fragment key={index}>
                                        <hr className="content-horizontal" />
                                        <CartItem  
                                        cartItem={item} 
                                        uniqueAttributes={item.uniqueAttributes} 
                                        theClass='cart-item-container' 
                                        rightCartItemStyle={'right-large-cart-item-container'}
                                        leftCartItemStyle={'large-left-cart-item-container'} 
                                        selected={'large-selected'} 
                                        normal={'large-normal'}
                                        />
                                    </Fragment>
                                     )) : 'Cart is empty!'
                             }
                        </div>
                       

                        <div className="cart-footer">
                            <hr className="footer-horizontal" />
                            <div className="tax">
                                <span className="tax-label">Tax 21%:</span>
                                <span className="tax-value">{ `\u00A0\u00A0\u00A0${selectedCurrency[0]}${tax}`}</span>
                            </div>

                            <div className="quantity">
                                <span className="quantity-label">Quantity:</span>
                                <span className="quantity-value">{`\u00A0\u00A0${cartCount}`}</span>
                            </div>
                            
                            <div className="total-container-large">
                                <span className="total-label">Total:</span>
                                <span className="total-value">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${selectedCurrency[0]}${cartTotal}`}</span>
                            </div>
                            
                            <div className="order">
                                <Button buttonType={'bigPrimary'} type='button'>order</Button>
                            </div>
                            
                        </div>
                </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        setCartItemsTax :() => dispatch(setCartItemsTax()),
    }
};

const mapStateToProps = state => {
    const { selectedCurrency } = state.currencySlice;
    const { cartItems, cartCount, cartTotal, tax } = state.cartSlice;
    
    return {
        selectedCurrency,
        cartItems,
        cartCount,
        cartTotal,
        tax,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart);