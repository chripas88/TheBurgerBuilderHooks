import React from 'react';
import classes from '../../stylesheets/components/ui/Button.module.css';

const button = (props) => (
	<button
		className={[classes.Button, classes[props.btnType]].join(' ')}
		onClick={props.clicked}
		disabled={props.disabled}>
		{props.children}
	</button>
);

export default button;