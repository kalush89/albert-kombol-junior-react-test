import React from "react";

import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";

import { setActiveCategory } from "../../store/categorySlice";

import CurrencyList from "../../components/currency-list/currency-list.component";
import CartOverlay from "../../components/cart-overlay/cart-overlay.component";

import companylogo from "../../assets/icons/a-logo.png";
import carticon from "../../assets/icons/empty-cart.png";
import chevronicon from "../../assets/icons/chevron.png";

import "./navigation.css";

class Navigation extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            currencyDropDown: false,
            cartOverleyOpen: false,
        }
    }


    setActive = category => {
        this.props.setActiveCategory(category);
    }

    toggleCurrencyDropDown = () => {
        this.setState({
            currencyDropDown: !this.state.currencyDropDown
        })
    }

    toggleCartOverlay = () => {
        this.setState({
            cartOverlayOpen: !this.state.cartOverlayOpen
        })
    }

    handleOverlay = () => {   
              this.toggleCartOverlay()
              document.body.classList.toggle("no-scroll");
      }

    render(){
        console.log(this.state.cartOverlayOpen)
        const { categories, activeCategory, selectedCurrency, cartCount } = this.props;
        const style = {
            transform: this.state.currencyDropDown ? 'rotate(180deg)' : '', 
            transition: 'transform 150ms ease', // smooth transition
           }
        return(
            <div className="container">
                <div className="nav-wrapper">
                    <div className="category-nav-container">
                        {categories.map(category => (
                            <Link key={category.name} className={`${activeCategory === category.name ? 'active':''}`} onClick={() => this.setActive(category.name)} to={{pathname: "/", search: `category=${category.name}` }}>{category.name}</Link>
                        ))}
                    </div>
                    <Link className="logo-nav" to="/">
                        <img src={companylogo} alt="logo" />
                    </Link>
                    <div className="actions-nav">
                        <div className="currency-nav" onClick={()=> this.toggleCurrencyDropDown()}>
                            <span className="currency-symbol">{selectedCurrency[0]}</span>
                            <span className="chevron-icon">
                                <img src={chevronicon} alt="currency" style={style} />
                            </span>
                            {this.state.currencyDropDown &&
                                <CurrencyList  />
                            }
                        </div>
                        <div className="cart-nav" onClick={() => this.handleOverlay()}>
                            <img src={carticon} alt="cart" />
                            <span className={this.props.flashIsActive ? "counter-flash":""}></span>
                                        {
                                            cartCount > 0 ?
                                            <span className='item-counter'>{cartCount}</span> : ''
                                        }
                            {this.state.cartOverlayOpen && 
                                <CartOverlay toggleCartOverlay={this.toggleCartOverlay} />
                            }
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        setActiveCategory :(ownProps) => dispatch(setActiveCategory(ownProps)),
    }  
}

const mapStateToProps = (state) => {
    const { categories, activeCategory } = state.categorySlice;
    const { selectedCurrency } = state.currencySlice;
    const { cartCount, flashIsActive } = state.cartSlice;
    return{
        categories,
        activeCategory,
        selectedCurrency,
        cartCount,
        flashIsActive,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);