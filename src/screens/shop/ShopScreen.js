import React from 'react';
import './ShopScreen.css';

class ShopScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {  };
  }  

  render() {
    return (
      <div className="shop-screen">
        <h1>Shop</h1>
      </div>
    );
  }

}

export const SHOP_SCREEN_NAME = "shop";
export default ShopScreen;