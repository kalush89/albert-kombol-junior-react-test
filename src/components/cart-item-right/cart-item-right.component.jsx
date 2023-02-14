import { Component } from "react";
import { connect } from "react-redux";

import Modal from "../modal/modal.component";

import arrowIcon from "../../assets/icons/arrow.png";

import { setImagesInView, toggleCounterFlash } from "../../store/cartSlice";

import "./cart-item-right.styles.css";

class CartItemRight extends Component {
    constructor(props){
        super(props);
        this.state={
            showModal: false,
        }
    }

    toggleModal = () => {
        this.setState({
           showModal: !this.state.showModal
        })
    }

    handleIncrease = () =>{
        const args = {itemToIncrease:this.props.theProps.cartItem, currency:this.props.selectedCurrency[0]}
        this.props.theProps.increaseItemCount(args);
       
        this.props.toggleCounterFlash();
       
        setTimeout(this.props.toggleCounterFlash, 500);
        
     }

     handleDecrease = () =>{
        const item = this.props.theProps.cartItem;
        if(item.count === 1){
            this.toggleModal();
        }else{
            const args = {itemToRemove:item, currency:this.props.selectedCurrency[0]}
            this.props.theProps.decreaseItemCount(args);
        }
     }

     handleRemoval = () =>{
            const args = {itemToRemove:this.props.theProps.cartItem, currency:this.props.selectedCurrency[0]}
            this.props.theProps.decreaseItemCount(args);
           
            this.toggleModal();
     }

     index = 1;
     nextSlide = (images, uniqueAttributes) => {
        const imageCount = images.length;
        const args = {image: images[this.index], uniqueAttributes}
        this.props.setImagesInView(args);
        this.index++;
        
        if(this.index === imageCount){
            this.index = 0;
        }
        
     }

     prevSlide = (images, uniqueAttributes) => {
        const imageCount = images.length;
        const args = {image: images[this.index], uniqueAttributes}
        this.props.setImagesInView(args);
        
       if(this.index === 0) {
        this.index = imageCount -1;
      } else {
        this.index--;
      }
       
     }
     
    render(){
        const { count, gallery, uniqueAttributes } = this.props.theProps.cartItem;
        const { rightCartItemStyle, sliderImagesInView} = this.props;
        const theImage = sliderImagesInView.find(imageInView => imageInView.id === JSON.stringify(uniqueAttributes))?.image;
        
        return(
            
            <div className={rightCartItemStyle}>
                <Modal 
                    title={"Remove item"}
                    message={"Remove this item from the cart?"} 
                    isActive={this.state.showModal} 
                    toggleModal={this.toggleModal} 
                    handleRemoval={this.handleRemoval}
                    type="confirm"
                    />

                <div className="add-reduce">
                    <span className='add-quantity' onClick={(e) =>this.handleIncrease(e)}></span>
                    <span className='item-count'>{count}</span>
                    <span className='reduce-quantity'  onClick={() =>this.handleDecrease()}></span>
                    
                </div>
                <div className="image-slider">
                    <div className='item-image'
                  
                                style={{
                                    backgroundImage:`url(${theImage ?? gallery[0]})`,
                                }}
                            />
                   {
                    gallery.length > 1 ?
                        <div className="slider-nav">
                            <div className="nav-prev" onClick={() => this.prevSlide(gallery, JSON.stringify(uniqueAttributes))} ><img src={arrowIcon} alt="previous" /></div>
                            <div className="nav-next" onClick={() => this.nextSlide(gallery, JSON.stringify(uniqueAttributes))} ><img src={arrowIcon} alt="next" style={{rotate:'180'}} /></div>
                        </div>
                    :''
                }
                </div>
                
            </div>

           
                    
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        setImagesInView:(ownProps) => dispatch(setImagesInView(ownProps)), 
        toggleCounterFlash:() => dispatch(toggleCounterFlash()),
    }
};

const mapStateToProps = (state) => {
    const { sliderImagesInView } = state.cartSlice;

    return {
        sliderImagesInView,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemRight);