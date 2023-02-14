import { createSlice } from "@reduxjs/toolkit";
import { setSelectedCurrency } from "./currencySlice";

const initialState = { 
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    selectedAttributes: [],
    sliderImagesInView: [],
    tax: 0,
    flashIsActive: false,
    
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = addItemToCart(state.cartItems, state.selectedAttributes, action.payload.itemToAdd);
            state.cartTotal = updateCartGrandTotal(state.cartItems, action.payload.currency);
            state.cartCount = updateCartCount(state.cartItems);
            state.tax = setTax(state.cartTotal);
        },

        increaseItemCount: (state, action) => {
            state.cartItems = increaseCartItemCount(state.cartItems, action.payload.itemToIncrease);
            state.cartTotal = updateCartGrandTotal(state.cartItems, action.payload.currency);
            state.cartCount = updateCartCount(state.cartItems);
            state.tax = setTax(state.cartTotal);
        },

        decreaseItemCount: (state, action) => {
            state.cartItems = decreaseCartItemCount(state.cartItems, action.payload.itemToRemove);
            state.cartTotal = updateCartGrandTotal(state.cartItems, action.payload.currency);
            state.cartCount = updateCartCount(state.cartItems);
            state.tax = setTax(state.cartTotal);
        },

        updateCartGrandTotalPrice: (state, action) => {
            state.cartTotal = updateCartGrandTotal(state.cartItems, action.payload);
        },

        updateCartItemsCount: (state) => {
            state.cartCount = updateCartCount(state.cartItems);
        },

        setSelectedAttribute: (state, action) => {
            state.selectedAttributes = 
            setItemAttribute(state.selectedAttributes, action.payload.item, action.payload.attributeId, action.payload.value);
        },

        setImagesInView: (state, action) => {
            state.sliderImagesInView = setSliderImagesInView(state.sliderImagesInView, action.payload);
        },

        setCartItemsTax: (state, action) => {
            state.tax = setTax(action.payload);
        },

        toggleCounterFlash: (state) => {
            state.flashIsActive = !state.flashIsActive;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(setSelectedCurrency, (state, action) =>{
            state.cartTotal = updateCartGrandTotal(state.cartItems, action.payload[0]);
        })
    }
})


/**
 * Add Items to cart
 * @param {*} cartItems 
 * @param {*} selectedAttributes 
 * @param {*} itemToAdd 
 * @returns Cart item object
 */
const addItemToCart = (cartItems, selectedAttributes, itemToAdd) => {
console.log(selectedAttributes)
    //get attribute(s) of the variant (itemToAdd), previously stored in the selectedAttributes object
    const variantAttributes = selectedAttributes.filter(attribute => attribute.productId === itemToAdd.id);
    
    //check if the variant exists in the cart
    const existingItem = cartItems.find(item => {
       // console.log('the boolean', JSON.stringify(item.uniqueAttributes) === JSON.stringify(variantAttributes))
       return item.id === itemToAdd.id && JSON.stringify(item.uniqueAttributes) === JSON.stringify(variantAttributes)
     } );
    
    
    //if variant exists increase count by one
    if (existingItem) {
        return cartItems.map(cartItem =>{
            return cartItem.id === itemToAdd.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(variantAttributes) ? { ...cartItem, count: cartItem.count + 1 } : cartItem;

         });
    } else {
         //If it doesn't, then add it
         const uniqueAttributes = [];
         variantAttributes.map(attribute => uniqueAttributes.push({
            productId: attribute.productId,
            attributeId: attribute.attributeId,
            attributeType: attribute.attributeType, 
            attributeItemValue: attribute.attributeItemValue} ) )
        return [...cartItems, { ...itemToAdd, count: 1, uniqueAttributes: uniqueAttributes }]
    }
};

/**
 * Increase item quantity in cart
 * @param {*} cartItems 
 * @param {*} itemToIncrease 
 * @returns cart item object with updated item count
 */
const increaseCartItemCount = (cartItems, itemToIncrease) => {
    //check if the variant exists in the cart
    const existingItem = cartItems.find(item => {
        return item.id === itemToIncrease.id && JSON.stringify(item.uniqueAttributes) === JSON.stringify(itemToIncrease.uniqueAttributes)
      } );

      //if variant exists increase count by one
    if (existingItem) {
        return cartItems.map(cartItem =>
            cartItem.id === itemToIncrease.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(itemToIncrease.uniqueAttributes) ? { ...cartItem, count: cartItem.count + 1 } : cartItem
         );
        }
        return cartItems;
};

/**
 * Decrease item quantity in cart
 * @param {*} cartItems 
 * @param {*} itemToRemove 
 * @returns cart item object with updated item count
 */
const decreaseCartItemCount = ((cartItems, itemToRemove) => {
    //check if the variant exists in the cart
    const existingItem = cartItems.find(cartItem => {
       return cartItem.id === itemToRemove.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(itemToRemove.uniqueAttributes)
     } );

   //if one matching item is left, remove it
   if(existingItem.count === 1) {
      return cartItems.filter(cartItem => JSON.stringify(cartItem.uniqueAttributes) !== JSON.stringify(itemToRemove.uniqueAttributes));
   }

   //else decrement cart item quantity by 1
   return cartItems.map((cartItem) =>
   cartItem.id === itemToRemove.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(itemToRemove.uniqueAttributes)  ? { ...cartItem, count: cartItem.count - 1 }
   : cartItem
   );
});

/**
 * Update cart total price
 * @param {*} cartItems 
 * @param {*} currency 
 * @returns returns total cost of cart items 
 */
const updateCartGrandTotal = (cartItems, currency) => {
    //flatten cartitems object
    const prices = cartItems.map(item => item.prices).flat();

    //get cartitems prices based on the currency selected
    const theOnes = prices.filter(price => price.currency.symbol === currency);
    
    
    // get cartitems price values
    const amounts = theOnes.map(theOne => theOne.amount);

    //get cartitems quantities
    const quantities = cartItems.map(anItem => anItem.count);
   
    let theItems=[];
    
    //create new object carrying each cartitem's price and count/quantity
    theItems = amounts.map((el, index) => {
            return {amount: el, count: quantities[index]};
    });

    //reduce to total cost of cartitems
    const theTotalPrice = theItems.reduce((total, item) =>  total + item.amount * item.count, 0);
   
    return theTotalPrice.toFixed(2);
};

/**
 * Update cart item count based on each item count
 * @param {*} cartItems 
 * @returns total items in cart
 */
const updateCartCount = cartItems => cartItems.reduce((total, cartItem)=> total + cartItem.count, 0);


/**
 * Set selected attributes of a cart item
 * @param {*} selectedAttributes 
 * @param {*} item
 * @param {*} attributeId
 * @param {*} value
 * @returns returns cart item selected attributes object
 */
const setItemAttribute = (selectedAttributes,
    item,
    attributeId,
    value
) => {
    
    // check if product has attributes
    if (item.attributes.length > 0) {
        
//if it does, check if the attribute already exists
        const existingAttribute = selectedAttributes.find(selectedAttribute => attributeId === selectedAttribute.attributeId && selectedAttribute.productId === item.id);
        //if it does, update it's value
        if (existingAttribute) {
            return selectedAttributes.map(selectedAttribute => {
                return attributeId === selectedAttribute.attributeId && selectedAttribute.productId === item.id ? {
                    ...selectedAttribute,
                    attributeItemValue: value
                } : selectedAttribute;
            });

            //if it dosen't, then add it to the object
        } else {
            
            return item.attributes.map(attribute => (
                    [{
                        productId: item.id, 
                        attributeId: attribute.id, 
                        attributeType: attribute.type, 
                        attributeItemValue: attribute.items[0].value
                    }]
           )).flat();
        }
    } else {
        return selectedAttributes;
    }
};

/**
 * 
 * @param {*} sliderMainImages 
 * @param {*} image
 * @param {*} uniqueAttributes 
 * @returns 
 */
const setSliderImagesInView = (sliderImagesInView, { image, uniqueAttributes }) => {
    const exists = sliderImagesInView.find( sliderImage => sliderImage.id === uniqueAttributes)
    if(exists){
       return  sliderImagesInView.map(sliderImage =>  
        sliderImage.id === uniqueAttributes ? {...sliderImage, image: image}: sliderImage
    )}
        return [...sliderImagesInView, {image: image, id: uniqueAttributes}]
    
}

/**
 * calculates tax based on the rate and cart grand total price
 * @param {*} cartTotal 
 * @returns calculated tax
 */
const setTax = (cartTotal) => {
   return ((21/100) * cartTotal).toFixed(2);
}


export const { 
    addToCart, 
    increaseItemCount, 
    decreaseItemCount, 
    updateCartGrandTotalPrice,
    updateCartItemsCount,
    setSelectedAttribute,
    setImagesInView,
    setCartItemsTax,
    toggleCounterFlash,
 } = cartSlice.actions

export default cartSlice.reducer

