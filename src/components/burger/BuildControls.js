import React from 'react';
import classes from '../../stylesheets/components/burger/BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (	
	<div className={classes.BuildControls}>
		<p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
		{controls.map(ctrl => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				disabled={props.disabled[ctrl.type]}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
			/>
		))}
		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
	</div>
);

export default buildControls;