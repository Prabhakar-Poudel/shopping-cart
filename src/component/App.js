import React, { Component } from 'react';
import { Button, Snackbar } from 'material-ui';

import Base from './Base';
import Cart from './Cart';
import Checkout from './Checkout';
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
			showOrderPlaced: false,
		};

		this.addToCart = this.addToCart.bind(this);
		this.goToCart = this.goToCart.bind(this);
		this.goToCheckout = this.goToCheckout.bind(this);
		this.goToInventory = this.goToInventory.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.orderPlaced = this.orderPlaced.bind(this);
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

	orderPlaced() {
		this.setState({
			cartItems: [],
			inventory: [...demoData],
			currentlyVisible: this.constants.inventory,
			showOrderPlaced: true,
		});
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
		const { currentlyVisible, cartItems, showOrderPlaced } = this.state;
		return (
			<div className="app">
				<div color="default" className="header">
					<div onClick={this.goToInventory}>Shopping List</div>
					<Button variant="raised" className="cart-button"
						onClick={this.goToCart}>{cartItems.length}</Button>
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
				{
					currentlyVisible === this.constants.checkout &&
					<Checkout cartItems={this.state.cartItems} orderPlaced={this.orderPlaced} />
				}
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={showOrderPlaced}
					autoHideDuration={3000}
					onClose={() => this.setState({showOrderPlaced: false})}
					ContentProps={{
						'aria-describedby': 'sent',
					}}
					message={<span id="sent">Order Placed sucessfully</span>}
				/>
			</div>
		);
	}
}

export default App;
