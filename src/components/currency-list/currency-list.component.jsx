import React from "react";
import { connect } from "react-redux";

import { setSelectedCurrency } from "../../store/currencySlice";


import './currency-list.styles.css';

class CurrencyList extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    

handleSelect(e){
  const arr =  e.target.innerHTML.split(' ');
  this.props.setSelectedCurrency(arr)
  //this.props.updateCartTotal(arr[0]);
 // this.props.toggleCurrencyList();
}

handleOnClickOutside = (e) => {
   if(this.ref.current && !this.ref.current.contains(e.target)){
        this.props.onClickOutside && this.props.onClickOutside();
   }
};

componentDidMount() {
    document.addEventListener('click', this.handleOnClickOutside, true);
}

componentWillUnmount() {
    document.removeEventListener('click', this.handleOnClickOutside, true);
}

    render(){
        const { currencies } = this.props;
        console.log('outside', this.props.onClickOutside)
        return(
            <div className="currencies-container" ref={this.ref} >
                <ul>
                {
                    currencies.map((currency, index) => (
                        <li key={index} onClick={(e)=>this.handleSelect(e)}>{currency.symbol} {currency.label}</li>
                    ))
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currencies, selectedCurrency } = state.currencySlice;

    return {
        currencies,
        selectedCurrency,
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        setSelectedCurrency:(ownProps)=> dispatch(setSelectedCurrency(ownProps)),
        
        //updateCartTotal:(ownProps) => dispatch(updateCartTotal(ownProps)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);