import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from '../../stylesheets/components/ui/Logo.module.css';

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt="MyBurger" />
	</div>
);

export default logo;