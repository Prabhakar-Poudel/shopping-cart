import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Card, CardContent, CardHeader, Button, CardActions  } from 'material-ui';
import numeral from 'numeral';

import Inventory from './Inventory';

import '../styles/base.css';

class Base extends Component {

	constructor() {
		super();
		this.state = {
			showModal: false,
			modalItem: {},
			selectedQuantity: 0,
			totalAmount: 0,
			cart: []
		};

		this.itemClicked = this.itemClicked.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.decrementQuantity = this.decrementQuantity.bind(this);
		this.incrementQuantity = this.incrementQuantity.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	itemClicked(item) {
		this.setState({ showModal: true, modalItem: item, selectedQuantity: 0, totalAmount: 0 });
	}

	handleModalClose() {
		this.setState({ showModal: false, selectedQuantity: 0, totalAmount: 0 });
	}

	decrementQuantity() {
		let current = this.state.selectedQuantity;
		if (current === 0) {
			return;
		}
		current -= 1;
		const totalAmount = current * this.state.modalItem.price;
		this.setState({ selectedQuantity: current, totalAmount });
	}

	incrementQuantity() {
		const max = this.state.modalItem.quantity;
		let current = this.state.selectedQuantity;
		if (current === max) {
			return;
		}
		current += 1;
		const totalAmount = current * this.state.modalItem.price;
		this.setState({ selectedQuantity: current, totalAmount });
	}

	handleAdd() {
		const { modalItem, selectedQuantity } = this.state;
		this.handleModalClose();
		if (selectedQuantity > 0) {
			this.props.addToCart(modalItem, selectedQuantity);
		}
	}

	render() {
		return (
			<div className="app-wrapper">
				<Inventory inventory={this.props.inventory} itemClicked={this.itemClicked} />
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.showModal}
					onClose={this.handleModalClose}
					style={{ display: 'flex' }}
				>
					<Card style ={{ height: 370, width: 400, margin: 'auto' }}>
						<CardHeader title={this.state.modalItem.name} className="modal-card-header"/>
						<CardContent className="card-content" >
							<div className="dummy-image">🕃 🕄</div>
							<div className="quantity-selection">
								<button className="quantity-button left" onClick={this.decrementQuantity}>-</button>
								<div>{this.state.selectedQuantity}</div>
								<button className="quantity-button right" onClick={this.incrementQuantity}>+</button>
							</div>
							<div>Select number of quantity to buy</div>
							<div className="total-amount">Total: <strong>{numeral(this.state.totalAmount).format('0,0')} Rs</strong></div>
						</CardContent>
						<CardActions disableActionSpacing className="card-actions">
							<Button variant="raised" color="secondary" onClick={this.handleModalClose}>Cancel</Button>
							<Button variant="raised" color="primary" onClick={this.handleAdd}>Add to cart</Button>
						</CardActions>
					</Card>
				</Modal>
			</div>
		);
	}
}

Base.propTypes = {
	inventory: PropTypes.arrayOf(PropTypes.shape()),
	addToCart: PropTypes.func.isRequired,
};

export default Base;
