import React from 'react';
import Logo from '../ui/Logo';
import NavigationItems from './NavigationItems';
import Backdrop from '../ui/Backdrop';
import Auxiliary from '../../hoc/Auxiliary';
import classes from '../../stylesheets/components/navigation/SideDrawer.module.css';

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if(props.open){
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	
	return(
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>	
		</Auxiliary>		
	);
}

export default sideDrawer;