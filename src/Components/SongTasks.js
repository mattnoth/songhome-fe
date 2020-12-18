import React from 'react'
import Axios from 'axios'
import moment from 'moment'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'

import {orange} from '@material-ui/core/colors'

const SongTasks = ({ song, setSong, baseUrl, comments, setComments, getSong }) => {
	const songId = song.id

	const songUrl = `${baseUrl}songs/${songId}`

	// const [taskStatus, setTaskStatus] = useState(false)

	const commentUrl = `http://localhost:8000/comments/`

	const handleDeleteComment = function (event, commentId) {
		console.log('hellow from hanlde dlete')
		
		Axios.delete(`${commentUrl}${commentId}`).then((response) => {
			
			getSong()

		})
	}

	return (
		<Container
		style={{
		}}>
			<div className='comment-container'>
				{song.comments?.map((comment) => {
					return (
						<Card className='container'
						style={{
							backgroundColor: orange[100]
						}} key={comment.id}>
						
								<Typography
								style={{
									textAlign: 'left',
									display: 'inline'
								}}
								> {comment.text} </Typography>
					
						
								<Button
								style={{
									display: 'inline',
									color: 'green'
								
								}}
									onClick={(event) => {
										handleDeleteComment(event, comment.id)
									}}>
									Mark As Complete
								</Button>
						
							<Typography component='p' style={{
								color: 'lightgray'
							}}>{moment(comment.created).calendar()}</Typography>

						</Card>
					)
				})}
			</div>
		</Container>
	)
}

export default SongTasks
