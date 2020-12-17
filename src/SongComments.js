import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'
import moment from 'moment'

const SongComments = ({ song, setSong, baseUrl }) => {
	const songId = song.id
	// const song_name = song.name

	const songUrl = `${baseUrl}songs/${songId}`

	const [taskStatus, setTaskStatus] = useState(false) 


	// const commentUrl = `${baseUrl}comments/`

	const commentUrl = `http://localhost:8000/comments/`

	const [formState, setFormState] = useState({
		text: '',
		song: '',
	})

	const handleChange = (event, plant_id) => {
		setFormState({
			...formState,
			[event.target.id]: event.target.value,
			song: song.id ,
		})
	}

	const handlePostComment = function (e) {
		const data = formState
		e.preventDefault()

		Axios.post(commentUrl, data)
			.then((response) => console.log(response))

	}

	const handleDeleteComment = function (event, commentId) {
	
		console.log("hellow from hanlde dlete")
		Axios.delete(`${commentUrl}/${commentId}`).then((response) => {
			
		})
	}

	return (
		<>
			<form action='submit' onSubmit={handlePostComment}>
				<Typography> Comment: </Typography>
				<input
					type='textarea'
					id='text'
					placeholder=''
					onChange={handleChange}
				/>
				<button type='submit'>Post Comment</button>
			</form>
			<div className='comment-container'>
				<div>
					{song.comments?.map((comment) => {
						return (
							<div className='container' key={comment.id}>
								<ul>
									<li className='name'>
										<Typography> {comment.text} </Typography>
										<button
											class=''
											className=''
											variant=''
											onClick={(event) => {
												handleDeleteComment(event, comment.id)
											}}>
											Delete
											{/* <i class='fa fa-trash'></i> */}
										</button>
									</li>

								
									{/* <li>{comment.comment_body}</li> */}
									<li>{moment(comment.created).fromNow()}</li>
								</ul>
								<form>
									<input type='radio' id='status'></input>
									{/* <input type="radio" id="male" name="gender" value="male">
									<label for="male">Male</label>
				 */}
								</form>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default SongComments
