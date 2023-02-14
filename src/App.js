import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Navigation from './page/navigation/navigation';
import Category from './page/category/category';
import Cart from './page/cart/cart';
import ProductDescription from './page/product-description/product-description';


class App extends React.Component {

  render() {
    
    return(
      <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Category />} />
            <Route path='product-description/*' element={<ProductDescription />} />
            <Route path='cart' element={<Cart />} />
          </Route>
      </Routes>
    )
  }



}

export default App;


