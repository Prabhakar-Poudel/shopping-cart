import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/item.css';

class Item extends Component {
	render() {
		const { name, brand, price, discount, quantity } = this.props;
		return (
			<div className="item-card" onClick={this.props.itemClicked}>
				<div className="item-name">{name}</div>
				<div className="item-brand">From: <em>{brand}</em></div>
				<div className="item-footer">
					<div>Rs {price}</div>
					<div>{quantity} Available</div>
					{discount > 0 ?
						<div>{discount}% off</div>
						:
						<div>No offer</div>
					}
				</div>
			</div>
		);
	}
}

Item.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	discount: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
	itemClicked: PropTypes.func.isRequired,
};

export default Item;
