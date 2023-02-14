import { Component } from "react";
import { connect } from "react-redux";

import { setSelectedAttribute } from "../../store/cartSlice";

import './swatch-picker.styles.css';

class SwatchPicker extends Component {

    handleSelect = (product, attributeId, value) => {
        const args = {item:product, attributeId, value}
        this.props.setSelectedAttribute(args);
    };

    render(){
        
        const { 
            theProductId, 
            attributeId, 
            value, 
            selected, 
            normal, 
            product, 
            uniqueAttributes 
        } = this.props;

       
        const existingAttribute = uniqueAttributes.find(att => 
            att.productId === theProductId && 
            att.attributeItemValue === value && 
            att.attributeId === attributeId);
    //value === '#FFFFFF'?{backgroundColor: value, border:"1px solid"}:{backgroundColor: value, borderColor: 'black'}
        return(
            <div className="swatch-picker-container" onClick={()=> product && this.handleSelect(product, attributeId, value)}>
           
                    <div className={ existingAttribute ? selected : normal} 
                    style={value === '#FFFFFF'?{backgroundColor: value, border:"1px solid #999595"}:{backgroundColor: value, }}
                    >
                    </div>
               
                
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

export default connect(mapStateToProps, mapDispatchToProps)(SwatchPicker);