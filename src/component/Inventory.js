import React, { Component } from 'react';
import { Button, Select, MenuItem, FormControl,
	InputLabel, Drawer, List, ListItem, ListItemText, Checkbox } from 'material-ui';
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

		this.brands = this.getBrands(props.inventory);

		this.state = {
			inventoryItems: [...props.inventory],
			sortBy: '',
			showDrawer: false,
			priceFilterIndex: 0,
			discountFilterIndex: 0,
			checkedBrands: this.brands.map(() => true),
		};


		this.filterPrice = ['All', 'Under 100', '100-500', '500 and above'];
		this.filterDiscount = ['All', '10% and more', '20% and more', '30% and more', '40% and more'];

		this.handleSort = this.handleSort.bind(this);
		this.mapSortCondition = this.mapSortCondition.bind(this);
		this.sortList = this.sortList.bind(this);
	}

	getBrands(list) {
		const brands = [];
		const iterator = list.entries();
		for (let i of iterator) {
			const brand = i[1].brand;
			if(!brands.includes(brand)) {
				brands.push(brand);
			}
		}
		return brands;
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

	sortList(list, sortBy) {
		const { field, left, right } = this.mapSortCondition(sortBy);
		return list.sort((a, b) => {
			return a[field] > b[field] ? left : a[field] === b[field] ? 0 : right;
		});
	}

	handleSort(event) {
		const { inventoryItems } = this.state;
		const sortBy = event.target.value;
		const sortResult = this.sortList(inventoryItems, sortBy);
		this.setState({ inventoryItems: sortResult, sortBy });
	}

	handlePriceFilterSelect(index) {
		return () => {
			const { discountFilterIndex, checkedBrands, sortBy } = this.state;
			this.handleAllFilters(index, discountFilterIndex, checkedBrands, sortBy);
		};
	}

	handleDiscountFilterSelect(index) {
		return () => {
			const { priceFilterIndex, checkedBrands, sortBy } = this.state;
			this.handleAllFilters(priceFilterIndex, index, checkedBrands, sortBy);
		};
	}

	handleBrandChcked(index) {
		return () => {
			const { priceFilterIndex, discountFilterIndex, checkedBrands, sortBy } = this.state;
			checkedBrands[index] = !checkedBrands[index];
			this.handleAllFilters(priceFilterIndex, discountFilterIndex, checkedBrands, sortBy);
		};
	}

	handleAllFilters(priceFilterIndex, discountFilterIndex, checkedBrands, sortBy) {
		let inventory = [...this.props.inventory];
		switch(priceFilterIndex) {
		case 1: inventory = inventory.filter(item => item.price < 100); break;
		case 2: inventory = inventory.filter(item => item.price >= 100 && item.price < 500); break;
		case 3: inventory = inventory.filter(item => item.price > 500); break;
		default: // todo
		}
		switch(discountFilterIndex) {
		case 1: inventory = inventory.filter(item => item.discount >= 10); break;
		case 2: inventory = inventory.filter(item => item.discount >= 20); break;
		case 3: inventory = inventory.filter(item => item.discount >= 30); break;
		case 4: inventory = inventory.filter(item => item.discount >= 40); break;
		default: // todo
		}
		const selectedbrands = this.brands.filter((brand, i) => checkedBrands[i]);
		inventory = inventory.filter(item => selectedbrands.includes(item.brand));
		if (sortBy.length > 0) {
			inventory = this.sortList(inventory, sortBy);
		}
		this.setState({ inventoryItems: inventory,priceFilterIndex, discountFilterIndex, checkedBrands, sortBy });
	}

	render() {
		return (
		
			<div className="inventory-pane">
				<div className="inventory-header">
					<Button onClick={() => this.setState({ showDrawer: true })}>Filter</Button>
					<FormControl style={{ marginLeft: 20 }}>
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
				<Drawer
					classes={{
						paper: 'drawer-paper',
					}}
					open={this.state.showDrawer}
					onClose={() => this.setState({ showDrawer: false })}
				>
					<span className="drawer-close-button" onClick={() => this.setState({ showDrawer: false })}>X</span>
					<div className="drawer-header">Filter options</div>
					<div className="filter-section">
						<div className="filter-header">Price</div>
						<List className="filter-body">
							{this.filterPrice.map((item, index) => {
								return <ListItem key={index} className="option" 
									onClick={this.handlePriceFilterSelect(index)}><ListItemText  primary={item} /></ListItem>;
							})}
						</List>
					</div>
					<div className="filter-section">
						<div className="filter-header">Discount</div>
						<List className="filter-body">
							{this.filterDiscount.map((item, index) => {
								return <ListItem key={index} className="option" 
									onClick={this.handleDiscountFilterSelect(index)}><ListItemText  primary={item} /></ListItem>;
							})}
						</List>
					</div>
					<div className="filter-section">
						<div className="filter-header">Brand</div>
						<List className="filter-body">
							{this.brands.map((item, index) => {
								return (
									<ListItem key={index} className="option" 
										onClick={this.handleBrandChcked(index)}>
										<Checkbox
											checked={this.state.checkedBrands[index]}
											tabIndex={-1} color="primary"
											disableRipple
										/>
										<ListItemText  primary={item} /></ListItem>
								);
							})}
						</List>
					</div>
				</Drawer>
			</div>
		);
	}
}

Inventory.propTypes = {
	inventory: PropTypes.arrayOf(PropTypes.shape()),
	itemClicked: PropTypes.func.isRequired,
};

export default Inventory;
