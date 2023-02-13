import React from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-tab.styles.css';

class CategoryTab extends React.PureComponent {


        render() {
         const { name, products } = this.props.categoryDetails;
          return (
           <div className='category-tab-container'>
              <div className='category-tab-title'>{name}</div>
              <div className='product-list'>
              {
                  products &&
                  products.map(product =>(
                    <Link key={product.id} to="/product-description" state={{product:product}}>
                      <ProductCard  product={product} />
                    </Link>
                  ))
              }
              </div> 
           </div>
           
           
          )
        }
      }

export default CategoryTab;
      
