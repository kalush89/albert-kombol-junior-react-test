import { Component } from "react";
import { connect } from "react-redux";

import { setSelectedAttribute } from "../../store/cartSlice";

import './text-attribute-picker.styles.css';

class TextAttributePicker extends Component {

    handleSelect = (product, attributeId, value) => {
        const args = {item:product, attributeId,value}
        this.props.setSelectedAttribute(args);
    }

    render(){
        const {theProductId, attributeId, value, uniqueAttributes, selected, normal, product } = this.props;
        const existingAttribute = uniqueAttributes.find(att => 
            att.productId === theProductId &&
             att.attributeItemValue === value &&
              att.attributeId === attributeId);
   
        return(
            <div className="text-attribute-picker-container" onClick={()=> 
            product && this.handleSelect(product, attributeId, value)}>
                 <div className={ (existingAttribute ? selected:normal)}>{value}</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        setSelectedAttribute:(ownProp) => dispatch(setSelectedAttribute(ownProp)),
    }
};

const mapStateToProps = state => {
    const { selectedAttributes } = state.cartSlice;

    return {
        selectedAttributes: selectedAttributes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextAttributePicker);
