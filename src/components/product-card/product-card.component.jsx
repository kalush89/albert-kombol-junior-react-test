import React from "react";
import { connect } from "react-redux";

import { addToCart, setSelectedAttribute, toggleCounterFlash } from "../../store/cartSlice";

import Button from "../button/button.component";
import OutOfStock from "../out-of-stock-card/out-of-stock.component";
import { getSelectedCurrencyDetails } from "../../utils/other.utils";
import cartIcon from '../../assets/icons/white-empty-cart.png';

import './product-card.styles.css';

class ProductCard extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            display: 'none',
        }
    }

    handleAddToCart = (e) => {
        const attributeArgs = {item:this.props.product, attributeId:'', value:''}
        this.props.setSelectedAttribute(attributeArgs);
        const cartItemArgs = {itemToAdd:this.props.product, currency:this.props.selectedCurrency[0]}
        this.props.addToCart(cartItemArgs);
        this.props.toggleCounterFlash();
       
        setTimeout(this.props.toggleCounterFlash, 500);
        e.preventDefault();
    }

    render(){
        
        const {brand, name, gallery, inStock, prices} = this.props.product;
        const currencyDetails = getSelectedCurrencyDetails(prices, this.props.selectedCurrency[1])

        const style ={ backgroundImage: `url(${gallery[0]})`,}

        return(
            <div className="product-card-container"
             onMouseEnter={e => {
                this.setState({display: 'block'});
            }}
            onMouseLeave={e => {
                this.setState({display: 'none'})
            }}>

                {inStock === false ? <OutOfStock height="444px" width="386px" /> : ''}
                <div className="background-image" style={style}/>

                <div className="add-item-to-cart" style={{display: this.state.display,}}>
                    <Button buttonType={'cart'} type="button" onClick={e=>inStock === true ? this.handleAddToCart(e): ''} >
                        <img src={cartIcon} alt="add to cart" />
                    </Button>
                </div>

                <span className="card-title">{brand} {name}</span>
                <div className="card-price">
                   
                    <span className="symbol">
                        {
                            currencyDetails[0].currency.symbol
                        }
                    </span>
                    <span className="amount">
                        {
                            currencyDetails[0].amount.toFixed(2)
                        }
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { selectedCurrency } = state.currencySlice;
    return {
        selectedCurrency,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addToCart:(ownProps) => dispatch(addToCart(ownProps)),
        setSelectedAttribute:(ownProps, ownProps1, ownProps2) => dispatch(setSelectedAttribute(ownProps, ownProps1, ownProps2)),
        toggleCounterFlash:() => dispatch(toggleCounterFlash()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);