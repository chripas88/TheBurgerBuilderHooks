import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../components/ui/Button';
import axios from '../axios/axios-orders';
import Spinner from '../components/ui/Spinner';
import Input from '../components/ui/Input';
import classes from '../stylesheets/containers/ContactData.module.css';
import withErrorHandler from '../hoc/withErrorHandler';
import * as actions from '../store/actions/index';
import { updateObject, checkValidity } from '../shared/utility';

const ContactData = props => {	
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Name'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipcode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Zip Code'
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Email'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{value: 'fastest', displayValue: 'Fastest'},
					{value: 'cheapest', displayValue: 'Cheapest'}
				]
			},
			value: 'fastest',
			validation: {},
			valid: true
		},
	});
	
	const [formIsValid, setFormISValid] = useState(false);

	const orderHandler = (event) => {
		event.preventDefault();		
		
		const formData = {};
		for(let formElementIdentifier in orderForm){
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: props.ingredients,
			price: props.totalPrice,
			orderData: formData,
			userId: props.userId
		}
		
		props.onOrderBurger(order, props.token);
	}
	
	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject( orderForm[inputIdentifier], 
			{value: event.target.value, 
			 valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
			 touched: true
			});		
		const updatedOrderForm = updateObject(orderForm, { [inputIdentifier]: updatedFormElement });
		
		let isValid = true;
		for(let inputIdentifier in  updatedOrderForm){
			isValid = updatedOrderForm[inputIdentifier].valid && isValid;
		}		
		setOrderForm(updatedOrderForm);
		setFormISValid(isValid);
	}


	const formElementsArray = [];
	for(let key in orderForm){
		formElementsArray.push({
			id: key,
			config: orderForm[key]
		});
	}

	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(formElement => (
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={(event) => inputChangedHandler(event, formElement.id)} />
			))}
			<Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
		</form>
	);

	if(props.loading){
		form = <Spinner />;
	}

	return(
		<div className={classes.ContactData}>
			<h4>Enter your contact data</h4>
			{form}
		</div>
	);

}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return{
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));