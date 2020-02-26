import React from 'react';
import Burger from '../burger/Burger';
import Button from '../ui/Button';
import classes from '../../stylesheets/components/order/CheckoutSummary.module.css';

const checkoutSummary = (props) => {
	return(
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button
				btnType="Danger"
				clicked={props.onCheckoutCancelled}>CANCEL</Button>
				<Button
					btnType="Success"
					clicked={props.onCheckoutContinued}>CONTINUE</Button>
		</div>
	);
}

export default checkoutSummary;