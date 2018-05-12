import React, { Component } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from 'material-ui';
import PropTypes from 'prop-types';

import Item from './Item';

import '../styles/inventory.css';

class Inventory extends Component {
	constructor(props) {
		super(props);

		this.constants = {
			priceLow: 'priceLow',
			priceHigh: 'priceHigh',
			discount: 'discount',
			arrival: 'arrival',
			sortNone: 'none',
		};

		this.state = {
			inventoryItems: props.inventory,
			sortBy: '',
		};

		this.handleSort = this.handleSort.bind(this);
		this.mapSortCondition = this.mapSortCondition.bind(this);
	}

	mapSortCondition(sortBy) {
		const { priceLow, priceHigh, discount, arrival } = this.constants;
		switch(sortBy) {
		case priceLow: return { field: 'price', left: 1, right: -1 };
		case priceHigh: return { field: 'price', left: -1, right: 1 };
		case discount: return { field: 'discount', left: -1, right: 1 };
		case arrival: return { field: 'arrivalDate', left: 1, right: -1 };
		default: return { field: null };
		}
	}

	handleSort(event) {
		const { inventoryItems } = this.state;
		const sortBy = event.target.value;
		const { field, left, right } = this.mapSortCondition(sortBy);
		const sortResult = inventoryItems.sort((a, b) => {
			return a[field] > b[field] ? left : a[field] === b[field] ? 0 : right;
		});
		this.setState({ inventoryItems: sortResult, sortBy });
	}

	render() {
		return (
			<div className="inventory-pane">
				<div className="inventory-header">
					<FormControl>
						<InputLabel htmlFor="sort-input">Sort By</InputLabel>
						<Select
							style={{ minWidth: 160}}
							value={this.state.sortBy}
							onChange={this.handleSort}
							inputProps={{
								name: 'sort',
								id: 'sort-input',
							}}
						>
							<MenuItem value={this.constants.priceLow}>Price low to high</MenuItem>
							<MenuItem value={this.constants.priceHigh}>Price high to low</MenuItem>
							<MenuItem value={this.constants.arrival}>Latest arrival</MenuItem>
							<MenuItem value={this.constants.discount}>Discounted value</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="inventory-list">
					{this.state.inventoryItems.map(item => {
						return <Item key={item.id} {...item} itemClicked={() => this.props.itemClicked(item)} />;
					})}
				</div>
			</div>
		);
	}
}

Inventory.propTypes = {
	inventory: PropTypes.arrayOf(PropTypes.shape()),
	itemClicked: PropTypes.func.isRequired,
};

export default Inventory;
