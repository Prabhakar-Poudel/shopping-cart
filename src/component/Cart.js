import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CartItem from './CrtItem';

import '../styles/cart.css';
import { Button } from 'material-ui';

class Cart extends Component {

	render() {
		const { cartItems } = this.props;
		if (cartItems.length > 0) {
			let sum = 0;
			return (
				<div className="cart-wrapper">
					{cartItems.map(item => {
						sum += item.quantity * item.price;
						return (
							<CartItem key={item.id} {...item} 
								removeClicked={() => this.props.removeClicked(item.id, item.quantity)}/>
						);
					})}
					<div className="cart-footer">
						<div className="cart-total">Total Amount  = {sum}</div>
						<Button variant="raised" color="primary"
							onClick={this.props.checkoutClicked}>Proceed to checkout</Button>
					</div>
				</div>
			);
		} else {
			return (
				<div className="empty-cart-message">
					Add items to you cart to view them here...
				</div>
			);
		}
		
	}
}

Cart.propTypes = {
	cartItems: PropTypes.arrayOf(PropTypes.shape()),
	checkoutClicked: PropTypes.func.isRequired,
	removeClicked: PropTypes.func.isRequired,
};

export default Cart;
