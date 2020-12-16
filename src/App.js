import { Route } from 'react-router-dom';
import React, { classes } from 'react'
import Songlist from './Songlist'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import './App.css';


function App() {

  // app state, if false, in dev

    // const classes = useStyles()
		// const [open, setOpen] = useState
		// const handleDrawerOpen = () => {
		// 	setOpen(true)
		// }
		// const handleDrawerClose = () => {
		// 	setOpen(false)
		// }



  return (
		<div className='App'>
			<header className='App-header'>
				<AppBar
					position='absolute'
					className={clsx(classes.appBar, open && classes.appBarShift)}
          
          >
					<Toolbar className={classes.toolbar}>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							className={clsx(
								classes.menuButton,
								open && classes.menuButtonHidden
							)}>
							<MenuIcon />
						</IconButton>
						<Typography
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							className={classes.title}>
							Dashboard
						</Typography>
						<IconButton color='inherit'>
							<Badge badgeContent={4} color='secondary'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
			</header>
			<main>
				<Route
					path='/'
					render={(routerProps) => {
						return <Songlist match={routerProps.match} />
					}}
				/>
			</main>
		</div>
	)
}

export default App;
