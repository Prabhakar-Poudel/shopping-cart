import React, { Component } from 'react';
import { Button, Paper, List, ListItem, ListItemText, TextField } from 'material-ui';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import '../styles/checkout.css';

class Checkout extends Component {

	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			phone: '',
			address: '',
			nameError: false,
			emailError: false,
			phoneError: false,
			addressError: false,
			showMessageSent: false,
		};

		this.handleBuy = this.handleBuy.bind(this);
	}

	handleChange(name) {
		return event => {
			this.setState({
				[name]: event.target.value,
			});
		};
	}

	handleBuy() {
		const { name, email, phone, address } = this.state;
		let nameError = false;
		let emailError = false;
		let phoneError = false;
		let addressError = false;
		if (name.length < 1) {
			nameError = true;
		}
		if (email.length < 1) {
			emailError = true;
		}if (phone.length < 1) {
			phoneError = true;
		}if (address.length < 1) {
			addressError = true;
		}
		this.setState({ nameError, emailError, phoneError, addressError });
		if (!(nameError || emailError || phoneError || addressError)) {
			this.props.orderPlaced();
		}
	}

	render() {
		let sum = 0;
		const { name, nameError, email, emailError, phone, phoneError, address, addressError } = this.state;
		return (
			<Paper className="checout-page">
				<div className="checkout-header">
					Items you are placing order for
				</div>
				<List>
					{this.props.cartItems.map(item => {
						const cost = item.quantity * item.price;
						const priceQuant = `Quantity ${item.quantity}, At ${numeral(cost).format('0,0')} Rs`;
						sum += cost;
						return (
							<ListItem key={item.id} className="checkout-list-item">
								<ListItemText primary={item.name} secondary={priceQuant} />
							</ListItem>
						);
					})}
				</List>
				<div className="checkout-total">Amount you pay: <strong>{numeral(sum).format('0,0')} Rs</strong></div>
				<div className="checkout-header">
					Please furnish the following details to make an order
				</div>
				<form className="user-details" autoComplete="off">
					<TextField
						required
						id="name"
						label="Your name"
						value={name}
						error={nameError}
						onChange={this.handleChange('name')}
						margin="normal"
					/>
					<TextField
						required
						id="email"
						type="email"
						label="Your E-mail"
						value={email}
						error={emailError}
						onChange={this.handleChange('email')}
						margin="normal"
					/>
					<TextField
						required
						id="phone"
						max={10}
						label="Your phone number"
						value={phone}
						error={phoneError}
						onChange={this.handleChange('phone')}
						margin="normal"
					/>
					<TextField
						required
						id="address"
						label="Delivery address"
						value={address}
						error={addressError}
						onChange={this.handleChange('address')}
						margin="normal"
					/>
					<div className="form-action">
						<Button variant="raised" color="primary" 
							size="large" onClick={this.handleBuy}>Buy Now</Button>
					</div>
				</form>
			</Paper>
		);
	}
}

Checkout.propTypes = {
	cartItems: PropTypes.arrayOf(PropTypes.shape()),
	orderPlaced: PropTypes.func.isRequired,
};

export default Checkout;
