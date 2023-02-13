export const getSelectedCurrencyDetails = (prices, label) => {
    return prices.filter((price) => price.currency.label === label);
}

//sort so swatch attribute type always appears last
export const compare = (a, b) => {
    if (a.type === b.type) return 0;
    else if (a.type === 'swatch') return 1;
  
    return -1;
  }