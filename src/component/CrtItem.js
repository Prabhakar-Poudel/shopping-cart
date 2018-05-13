import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardContent, CardHeader } from 'material-ui';
import numeral from 'numeral';

import '../styles/cartItem.css';

class CartItem extends Component {

	render() {
		const { name, brand, price, quantity, removeClicked } = this.props;
		return (
			<Card className="cart-item">
				<CardHeader title={name} subheader={brand} action={
					<Button color="secondary" onClick={removeClicked}>Remove</Button>
				}/>
				<CardContent>
					<div> 
						Cost: <strong>{price} X {quantity} = {numeral(price*quantity).format('0,0')} Rs</strong>
					</div>
				</CardContent>
			</Card>
		);
	}
}

CartItem.propTypes = {
	name: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
	removeClicked: PropTypes.func.isRequired,
};

export default CartItem;
