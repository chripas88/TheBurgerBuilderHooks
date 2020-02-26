import React, { useEffect, Suspense } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Layout from '../containers/Layout';
import BurgerBuilder from '../containers/BurgerBuilder';
import Logout from '../containers/Logout';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

const Checkout = React.lazy(() => {
	return import('../containers/Checkout');
});

const Orders = React.lazy(() => {
	return import('../containers/Orders');
});

const Auth = React.lazy(() => {
	return import('../containers/Auth');
});

const App = (props) => {
	const { onAuthCheckState } = props;
	
	
	useEffect(() => {
		onAuthCheckState();	
	}, [onAuthCheckState]);

	let routes = (
		<Switch>
			<Route path="/auth" render={(props) => <Auth {...props}/>} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);
	
	if(props.isAuthenticated){
		routes = (
			<Switch>
				<Route path="/checkout" render={(props) => <Checkout {...props}/>} />
				<Route path="/orders" render={(props) => <Orders {...props}/>} />
				<Route path="/logout" component={Logout} />
				<Route path="/auth" render={(props) => <Auth {...props}/>} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	};
	
	return(
		<div>
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>
					{routes}
				</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = state => {
	return{
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return{
		onAuthCheckState: () => dispatch(actions.authCheckState())
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));