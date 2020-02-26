import React from 'react';
import classes from '../../stylesheets/components/navigation/Toolbar.module.css';
import Logo from '../ui/Logo';
import NavigationItems from './NavigationItems';
import DrawerToggle from './DrawerToggle';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked}/>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuthenticated={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;