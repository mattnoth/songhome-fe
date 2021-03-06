import { Route } from 'react-router-dom'
import React from 'react'
import Navigation from './Components/Navigation'
import Songlist from './Components/Songlist'
import Createsong from './Components/Createsong'
import SongDash from './Components/SongDash'
import {
	makeStyles,
	ThemeProvider,
	createMuiTheme,
} from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

import './App.css'

function App() {



	const baseUrl = `https://blooming-earth-00957.herokuapp.com/`

	// const baseUrl = `http://localhost:8000/`

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
		},
		details: {
			display: 'flex',
			flexDirection: 'column',
		},
		content: {
			flex: '1 0 auto',
			position: 'center',
		},
		cover: {
			width: 151,
		},

		list: {
			width: 250,
		},
		fullList: {
			width: 'auto',
		},
		controls: {
			display: 'flex',
			alignItems: 'center',
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		playIcon: {
			height: 38,
			width: 38,
		},
	}))

	const theme = createMuiTheme({
		palette: {
			primary: {
				main: orange[500],
			},
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<div className='App'>
				<header className='App-header'>
					<Route
						path='/'
						render={(routerProps) => {
							return (
								<Navigation match={routerProps.match} useStyles={useStyles} />
							)
						}}
					/>
				</header>
				<main>
					<Route
						path='/'
						exact
						render={(routerProps) => {
							return (
								<Songlist
									match={routerProps.match}
									baseUrl={baseUrl}
									theme={theme}
									useStyles={useStyles}
								/>
							)
						}}
					/>
					<Route
						path='/createsong'
						exact
						render={(routerProps) => {
							return <Createsong match={routerProps.match} baseUrl={baseUrl} />
						}}
					/>
					<Route
						path='/song/:id'
						render={(routerProps) => {
							return (
								<SongDash
									history={routerProps.history}
									match={routerProps.match}
								
								/>
							)
						}}
					/>
				</main>
			</div>
		</ThemeProvider>
	)
}

export default App
