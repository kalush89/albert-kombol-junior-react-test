import React from 'react';
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';

import { addToCart, setSelectedAttribute, toggleCounterFlash } from '../../store/cartSlice';
import { setSelectedImage } from '../../store/productSlice';

import Modal from '../../components/modal/modal.component';
import Button from '../../components/button/button.component';
import SwatchPicker from '../../components/swatch-picker/swatch-picker.component';
import TextAttributePicker from '../../components/text-attribute-picker/text-attribute-picker.component';

import { getSelectedCurrencyDetails, compare } from '../../utils/other.utils';

import './product-description.css';

class ProductDescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false
          };
          this.myRef = React.createRef()
    }

   
    
    componentDidMount(){
        window.scrollTo(0, 0);
        this.myRef.current.innerHTML = this.props.state.product.description;
        
       // pick default selected product image
       this.handleImgSelect(this.props.state.product.gallery[0]);
        
       //fill selectedAttributes object with default product attributes on component mount
       const args = {item:this.props.state.product, attributeId:'', value:''};
        if(this.props.selectedAttributes.some(attribute => this.hasValue(attribute,'productId', this.props.state.product.id )) === false){
          this.props.setSelectedAttribute(args);
       }  
    }

    hasValue = (obj, key, value) => {
        return obj.hasOwnProperty(key) && obj[key] === value;
       }

    toggleModal =()=>{
        this.setState({
            showModal: !this.state.showModal
          });
    }

     handleAddToCart = () =>{
        const args = {itemToAdd:this.props.state.product, currency:this.props.selectedCurrency[0]}
        this.props.addToCart(args);
       
        this.props.toggleCounterFlash();
        setTimeout(this.props.toggleCounterFlash, 500);
     }

     handleImgSelect = (img) => {
        this.props.setSelectedImage(img);
     }


    render(){
        const {id, attributes, name, brand, gallery, inStock} = this.props.state.product;
        const currencyDetails = getSelectedCurrencyDetails(this.props.state.product.prices, this.props.selectedCurrency[1]);
        
        return(
            <div className='product-description-container'>
               <Modal 
                    title={"Not available"}
                    message={"Product not available at the moment"} 
                    isActive={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    handleRemoval=""
                    type="notify"
                />
                
            <aside className="thumbnails" >
                {gallery.map(image => {
                    return <div key={image} className="thumbnail" onClick={()=>this.handleImgSelect(image)}>
                        <div className="thumbnail-image" style={{
                            backgroundImage: `url(${image})`,
                        }}></div>
                    </div>
                })}
            </aside>

            <main className="large-image" style={{
                            backgroundImage: `url(${this.props.selectedImage})`,
                        }} ></main>
  
                
                <div className="description">
                
                    <div className="product-name">
                        <span className="brand">{brand}</span>
                        <span className="name">{name}</span>
                    </div>
                   
                    { attributes.slice(0).sort(compare).map(attribute =>(
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
                                        uniqueAttributes={this.props.selectedAttributes} 
                                        selected={'large-selected'} 
                                        normal={'large-normal'} 
                                        product={this.props.state.product} 
                                        />
                                        : 
                                        <TextAttributePicker 
                                        key={item.id} 
                                        theProductId={id} 
                                        attributeId={attribute.id}
                                        value={item.value} 
                                        uniqueAttributes={this.props.selectedAttributes} 
                                        selected={'large-selected'} 
                                        normal={'large-normal'} 
                                        product={this.props.state.product} 
                                        /> 
                                             
                                ))}
                             </div> 
                        </div>
                    ))}
                    <div className="product-price">
                        <div className="price-label">price</div>
                        <div className="price-value">
                            <span className="cur-symbol">{currencyDetails[0].currency.symbol}</span>
                            <span className="cur-amount">{currencyDetails[0].amount}</span>
                        </div>
                    </div>
                    <div className="add-product-to-cart">
                     <Button buttonType={'bigPrimary'} type='button' onClick={()=>inStock === true ? this.handleAddToCart() : this.toggleModal()}>Add to cart</Button>
                    </div>
                    
                    <div className="product-description" ref={this.myRef}></div>
                </div>
            </div>
        )
    }
}

const wrapClassInHook=(Component)=>{
    return function WrappedComponent(){
        const {state } = useLocation();
        return <Component state={state}/>;
    }
}

const mapStateToProps = (state) => {
    const { selectedCurrency } = state.currencySlice;
    const { selectedAttributes } = state.cartSlice;
    const { selectedImage } = state.productSlice;
    return {
        selectedCurrency,
        selectedAttributes,
        selectedImage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedAttribute:(ownProps) => dispatch(setSelectedAttribute(ownProps)),
        addToCart:(ownProps) => dispatch(addToCart(ownProps)),
        toggleCounterFlash:() => dispatch(toggleCounterFlash()),
        setSelectedImage:(ownProps) => dispatch(setSelectedImage(ownProps)),
    }
}



export default wrapClassInHook(connect(mapStateToProps, mapDispatchToProps)(ProductDescription));