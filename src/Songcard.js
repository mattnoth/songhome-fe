import React from 'react';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

const Songcard = ({song}) => {
    return (
			<>
				<NavLink to={'/song/' + song.id}>
				    <div>Hello</div> 
				</NavLink>
			</>
		)
};

export default Songcard;