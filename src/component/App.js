import React, { Component } from 'react';
import { Button } from 'material-ui';

import Base from './Base';
import demoData from '../demo/demo-data';

import '../styles/app.css';


class App extends Component {
	constructor() {
		super();
		this.constants = {
			inventory: 'inventory',
			cart: 'cart',
			checkout: 'checkout',
		};
		this.state = {
			cartItems: [],
			inventory: [...demoData],
			currentlyVisible: this.constants.inventory,
		};

		this.addToCart = this.addToCart.bind(this);
		this.viewCart = this.viewCart.bind(this);
	}

	addToCart(item, quantity) {
		if (quantity < 1) {
			return;
		}
		const { inventory, cartItems } = this.state;
		inventory.splice(inventory.findIndex(e => e.id === item.id), 1, {...item, quantity: item.quantity - quantity});
		const existingCartItem = cartItems.find(e => e.id === item.id);
		if (existingCartItem) {
			const { index } = existingCartItem;
			cartItems[index].quantity += quantity;
		} else {
			cartItems.push({ ...item, quantity, index: cartItems.length });
		}
		this.setState({ cartItems, inventory });
	}

	viewCart() {
		// TODO
		// this.setState({ currentlyVisible: this.constants.cart });
	}
	
	render() {
		return (
			<div className="app">
				<div color="default" className="header">
					<div >Shoping Demo</div>
					<Button variant="raised" style={{ backgroundColor: 'yellowgreen'}} onClick={this.viewCart}>View Cart</Button>
					<Button variant="raised" color="primary">Checkout</Button>
				</div>
				<Base inventory={this.state.inventory} addToCart={this.addToCart} />
			</div>
		);
	}
}

export default App;
