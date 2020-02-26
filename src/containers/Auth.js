import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import classes from '../stylesheets/containers/Auth.module.css';
import * as actions from '../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../shared/utility';

const Auth = props => {	
	const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
	const [controls, setConrols] = useState({
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
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5
				},
				valid: false,
				touched: false
			},
		});
	const [isSignUp, setIsSignUp] = useState(true);

	useEffect(() => {
		if(!buildingBurger && authRedirectPath !== '/'){
			onSetAuthRedirectPath('/');
		}
	}, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(controls, {
			[controlName]: updateObject(controls[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, controls[controlName].validation),
				touched: true
			})
		});
		setConrols(updatedControls);
	}
	
	const submitHandler = (event) => {
		event.preventDefault();
		props.onAuth(controls.email.value, controls.password.value, isSignUp);
	}
	
	const switchAuthModeHandler = () => {
		setIsSignUp(!isSignUp);
	}
	
	const formElementsArray = [];
	for(let key in controls){
		formElementsArray.push({
			id: key,
			config: controls[key]
		});
	}

	let form = formElementsArray.map(formElement => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => inputChangedHandler(event, formElement.id)} />
	));

	if(props.loading){
		form = <Spinner />;
	}

	let errorMessage = null;
	if(props.error){
		errorMessage = <p>{props.error.message}</p>;
	}

	let authRedirect = null;
	if(props.isAuthenticated){
		authRedirect = <Redirect to={props.authRedirectPath} />
	}

	return(
		<div className={classes.Auth}>
			{authRedirect}
			<h4>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h4>
			<form onSubmit={submitHandler}>
				{form}
				{errorMessage}
				<Button btnType="Success">SUBMIT</Button>
			</form>
			<Button
				btnType="Danger"
				clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
		</div>
	);
	
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);