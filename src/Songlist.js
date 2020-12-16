import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Songlist = ({ routerProps, baseUrl }) => {
	const [songlist, setSonglist] = useState([])


	const songsUrl = `songs/`

	useEffect(function () {
		// console.log(process.env.NODE_ENV)
		Axios(baseUrl + songsUrl)
			.then((data) => {
				console.log(data)
				setSonglist(data.data)
			})
			.catch(console.error)
		//eslint-disable-next-line
	}, [])
	return (
		<Container maxWidth='lg'>
				<Grid container spacing={4} justify='center'>
					{songlist.map((song) => (
                        <Grid item 
                        xs={12}
                        sm={6}
                        lg={4}
                        >
							<NavLink to={'/song/' + song.id}>
								<Paper style={{ height: 200, width: '100%' }} variant='primary'>
									<Typography variant='h6'>{song.name}</Typography>
								</Paper>
							</NavLink>
						</Grid>
					))}
				</Grid>
		</Container>
	)
}

export default Songlist
