import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auxiliary from '../hoc/Auxiliary';
import Burger from '../components/burger/Burger';
import OrderSummary from '../components/burger/OrderSummary';
import BuildControls from '../components/burger/BuildControls';
import Modal from '../components/ui/Modal';
import axios from '../axios/axios-orders';
import Spinner from '../components/ui/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';
import * as actions from '../store/actions/index';

export const BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);
	const ingredients = useSelector((state) => { return state.burgerBuilder.ingredients });
	const totalPrice = useSelector((state) => { return state.burgerBuilder.totalPrice });
	const error = useSelector((state) => { return state.burgerBuilder.error });
	const isAuthenticated = useSelector((state) => { return state.auth.token !== null });
	const dispatch = useDispatch();	
	const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
	const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
	const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
	const onPurchaseInit = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
	

	useEffect(() => {
		onInitIngredients();
	},[onInitIngredients]);

	const updatePurchaseState = () => {	
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]; 
			})
			.reduce((sum, el) => {
			return sum + el;
		}, 0);
		
		return sum > 0;
	}
	
	const purchaseHandler = () => {
		if(isAuthenticated){
			setPurchasing(true);
		} else {
			onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}
	
	const purchaseCancelHandler = () => {
		setPurchasing(false);
	}
	
	const purchaseContinueHandler = () => {
		onPurchaseInit();
		props.history.push('/checkout');
	}

	const disabledInfo = {...ingredients};

	for(let key in disabledInfo){
		disabledInfo[key] = disabledInfo[key] <= 0;
	}

	let orderSummary = null;	
	let burger = error ? <p>Cannot load ingredients. Please reload page!</p> : <Spinner />;

	if(ingredients){
		burger =(
			<Auxiliary>
				<Burger ingredients={ingredients}/>
				<BuildControls
					disabled={disabledInfo}
					totalPrice={totalPrice}
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					purchasable={updatePurchaseState()}
					ordered={purchaseHandler}
					isAuth={isAuthenticated}/>
			</Auxiliary>
		);

		orderSummary = <OrderSummary
			ingredients={ingredients}
			totalPrice={totalPrice}
			purchaseCancelled={purchaseCancelHandler}
			purchaseContinued={purchaseContinueHandler}/>;
	}

	return(
		<Auxiliary>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
				{burger}
		</Auxiliary>
	);
	
}

export default withErrorHandler(BurgerBuilder, axios);