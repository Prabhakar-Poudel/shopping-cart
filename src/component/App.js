import React, { Component } from 'react';
import { Button } from 'material-ui';

import Base from './Base';
import Cart from './Cart';
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
		this.goToCart = this.goToCart.bind(this);
		this.goToCheckout = this.goToCheckout.bind(this);
		this.goToInventory = this.goToInventory.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
	}

	addToCart(item, quantity) {
		if (quantity < 1) {
			return;
		}
		const { inventory, cartItems } = this.state;
		inventory.splice(inventory.findIndex(e => e.id === item.id), 1, {...item, quantity: item.quantity - quantity});
		const index = cartItems.findIndex(e => e.id === item.id);
		if (index > 0) {
			cartItems[index].quantity += quantity;
		} else {
			cartItems.push({ ...item, quantity, index: cartItems.length });
		}
		this.setState({ cartItems, inventory });
	}

	removeFromCart(id, quantity) {
		const { inventory, cartItems } = this.state;
		cartItems.splice(cartItems.findIndex(e => e.id === id), 1);
		const index = inventory.findIndex(e => e.id === id);
		inventory[index].quantity += quantity;
		this.setState({ cartItems, inventory });
	}

	goToCart() {
		this.setState({ currentlyVisible: this.constants.cart });
	}

	goToCheckout() {
		this.setState({ currentlyVisible: this.constants.checkout });
	}

	goToInventory() {
		this.setState({ currentlyVisible: this.constants.inventory });
	}
	
	render() {
		const { currentlyVisible, cartItems } = this.state;
		return (
			<div className="app">
				<div color="default" className="header">
					<div onClick={this.goToInventory}>Home <span role="img">🏚</span></div>
					<Button variant="raised" style={{ backgroundColor: 'yellowgreen'}}
						onClick={this.goToCart}>View <span role="img">🛒</span></Button>
					{ cartItems.length > 0 &&
					<Button variant="raised" color="primary"
						onClick={this.goToCheckout}>Checkout</Button>
					}
				</div>
				{
					currentlyVisible === this.constants.inventory &&
					<Base inventory={this.state.inventory} addToCart={this.addToCart} />
				}
				{
					currentlyVisible === this.constants.cart &&
					<Cart cartItems={this.state.cartItems} checkoutClicked={this.goToCheckout}
						removeClicked={this.removeFromCart}/>
				}
			</div>
		);
	}
}

export default App;
