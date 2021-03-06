import React from 'react';
import classes from '../../stylesheets/components/ui/Modal.module.css';
import Auxiliary from '../../hoc/Auxiliary';
import Backdrop from './Backdrop';

const Modal = props => {
	return(
		<Auxiliary>
			<Backdrop show={props.show} clicked={props.modalClosed}/>
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>{props.children}</div>
		</Auxiliary>
	);	
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);