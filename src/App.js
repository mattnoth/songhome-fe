import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Components/Navigation'
import ListView from './Components/ListView'
import Createsong from './Components/NewSong/Createsong'
import OneSongDashboard from './Components/ShowOne/OneSongDashboard'
import SongTable from './Components/SongTable'
import Edit from './Components/Edit'
import {
	makeStyles,
	ThemeProvider,
	createTheme,
} from '@material-ui/core/styles'
import { blueGrey } from '@material-ui/core/colors'

//TODO -- Breakdown the stylees into their individual components 
// useStyles is Material UI's overide of CSS and is used to apply classes 
// to elements as well as use theme to create general theme for entire SPA 

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center'
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		textDecoration: 'none',
		alignItems: 'center',
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
		display: 'flex',
		justify: 'center',
		color: 'red'
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

// provides basic MUI theme
const theme = createTheme({
	palette: {
		primary: {
			main: blueGrey[500],
		},
	},
})

//* Add a JEST Unit Test  */
// TODO -- add delete route for song 

//** All accessible route paths and top level of rendered components  */
function App() {

	const baseUrl = `https://blooming-earth-00957.herokuapp.com/`

	return (
		<ThemeProvider theme={theme}>
			<Route
				path='/'
				render={(routerProps) => {
					return (
						<Navigation
							match={routerProps.match}
							useStyles={useStyles} />
					)
				}}
			/>
			<Route
				path='/'
				exact
				render={(routerProps) => {
					return (
						<ListView
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
					return (
						<Createsong
							match={routerProps.match}
							baseUrl={baseUrl}
						/>
					)
				}}
			/>
			<Route
				path='/songtable'
				exact
				render={(routerProps) => {
					return (
						<SongTable
							match={routerProps.match}
							baseUrl={baseUrl}
						/>
					)
				}}
			/>
			<Route
				path='/song/:id'
				exact
				render={(routerProps) => {
					return (
						<OneSongDashboard
							history={routerProps.history}
							match={routerProps.match}
						/>
					)
				}}
			/>
			<Route
				path='/song/:id/edit'
				exact
				render={(routerProps) => {
					return (
						<Edit
							history={routerProps.history}
							match={routerProps.match}
							baseUrl={baseUrl}
						/>
					)
				}}
			/>
		</ThemeProvider>
	)
}
export default App
