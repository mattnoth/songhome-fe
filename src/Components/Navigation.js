import React, { useState } from 'react'

/** MaterialUi Components are not deconstructed for faster performance */
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import { Box } from '@mui/system'
import {
	Grid,
	Music,
	Play
} from 'react-feather'

import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import { NavLink } from 'react-router-dom'

const Navigation = ({ useStyles }) => {
	const classes = useStyles

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

	// list applies temporary styles || classes to the drawer when toggled 
	// @TODO -- move styles to a seperate file 
	const list = (anchor) => (
		<>
			<List
				className={clsx(classes.list, {
					[classes.fullList]: anchor === 'top' || anchor === 'bottom',
				})}
				role='presentation'
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}>
				<NavLink to='/' style={{ textDecoration: 'none' }}>
					<ListItem key='dashboard'>
						<ListItemIcon>
							<Music />
						</ListItemIcon>
						<ListItemText
							disableTypography
							primary={<Typography type="body2" style={{ color: 'black' }}>Dashboard</Typography>} />
					</ListItem>
				</NavLink>
				<NavLink to='/createsong/' style={{ textDecoration: 'none' }}>
					<ListItem key='createsong'>
						<ListItemIcon>
							<Play />
						</ListItemIcon>
						<ListItemText disableTypography
							primary={<Typography type="body2" style={{ color: 'black' }}>Create Song</Typography>} />
					</ListItem>
				</NavLink >
				<NavLink to='/songtable/' style={{ textDecoration: 'none' }}>
					<ListItem key='song table'>
						<ListItemIcon>
							<Grid />
						</ListItemIcon>
						<ListItemText disableTypography
							primary={<Typography type="body2" style={{ color: 'black' }}>Table View</Typography>} />
					</ListItem>
				</NavLink>
			</List>
		</>
	)
	//@TODO - add Nav items on the AppBar itself with correct Spacing 
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' className={classes.root}>
				<Toolbar>
					<IconButton
						edge='start'
						className='inherit'
						aria-label='menu'
						onClick={toggleDrawer('left', true)}>
						<MenuIcon />
					</IconButton>
					<NavLink to='/' style={{ textDecoration: 'none' }} >
						<Typography variant='h6' component="div" sx={{ flexGrow: 1 }} style={{ color: 'white ' }}>Beatbay</Typography>
					</NavLink>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor='left'
				open={state['left']}
				onClose={toggleDrawer('left', false)}>
				{list('left')}
			</Drawer>
		</Box>
	)
}

export default Navigation
