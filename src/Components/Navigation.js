import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import { NavLink } from 'react-router-dom'

const Navigation = ({ useStyles }) => {
	const classes = useStyles()
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<List>
				<ListItem button onClick='' key='createsong'>
					<ListItemIcon></ListItemIcon>
					<NavLink to='/'>
						<ListItemText primary='Home' />
					</NavLink>
				</ListItem>
				<ListItem button onClick='' key='createsong'>
					<ListItemIcon></ListItemIcon>
					<NavLink to='/createsong/'>
						<ListItemText primary='Create Song' />
					</NavLink>
				</ListItem>
			</List>
	
		</div>
	)

	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' className color='inherit' aria-label='menu'>
						<MenuIcon onClick={toggleDrawer('left', true)} />
					</IconButton>
					<Typography variant='h6'>Beatbay</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor='left'
				open={state['left']}
				onClose={toggleDrawer('left', false)}>
				{list('left')}
			</Drawer>
		</>
	)
}

export default Navigation
