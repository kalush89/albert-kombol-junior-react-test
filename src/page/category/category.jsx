import React from "react";
import { connect } from "react-redux";

import { fetchCategoryDetails } from "../../store/categorySlice";

import CategoryTab from "../../components/category-tab/category-tab.component";

class Category extends React.PureComponent {
    
      
    componentDidMount(){
        this.props.fetchCategoryDetails(this.props.activeCategory)
    }
  
   componentDidUpdate(prevProps){
        if(prevProps.activeCategory !== this.props.activeCategory){
            this.props.fetchCategoryDetails(this.props.activeCategory);
        }
     }
   
    render(){
       
        const { categoryDetails } = this.props;
        return(
            <div>
                <CategoryTab categoryDetails={categoryDetails}  />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
            
    return {
        fetchCategoryDetails:(ownProps) => dispatch(fetchCategoryDetails(ownProps)),
    }
};

  
const mapStateToProps = (state) => {
    const { activeCategory, categoryDetails } = state.categorySlice;
    return {
        activeCategory,
        categoryDetails,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);