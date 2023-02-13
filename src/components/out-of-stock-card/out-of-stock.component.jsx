import { Component } from "react";

import "./out-of-stock.styles.css"

class OutOfStock extends Component {
    render(){
        const { height, width } = this.props;
        return(
            <div className="stock-out-container" style={{height: height, width: width}}>
                <div className="stock-out-content">
                    out of stock
                </div>
            </div>
        )
    }
}

export default OutOfStock;