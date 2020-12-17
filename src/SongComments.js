import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Axios from 'axios'

const SongComments = ({ song, setSong, baseUrl }) => {
    const songId = song.id
    const song_name = song.name

	const songUrl = `${baseUrl}songs/${songId}`

	const [formState, setFormState] = useState({
		text: '',
		song_name: ''
	})

	const handleChange = (event, plant_id) => {
		setFormState({
			...formState,
			[event.target.id]: event.target.value,
			song_name: song_name,
		})
	}

	const handlePostComment = function (e) {
		const data = formState
        e.preventDefault()

        console.log(data)


		// Axios.post(songUrl, data)
		// 	.then((response) => console.log(response))

		// 	.then(() => {
		// 		fetch()
		// 			.then((res) => res.json())
		// 			.then((res) => {
		// 				console.log(res)
		// 			})
		// 			.catch(console.error)
		// 	})
    }
    
    const handleDeleteComment = function (event, commentId) {
            // const deleteUrl = `${commentsUrl}/`
            
            Axios.delete()
            
				.then((response) => console.log(response))
				.then(() => {
					fetch()
						.then((res) => res.json())
						.then((res) => {
							setSong(res)
						})
						.catch(console.error)
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
                <button
                type='submit'
                >Post Comment</button>
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
									<hr />
									{/* <li>{comment.comment_body}</li> */}
									{/* <li>{moment(comment.createdAt).fromNow()}</li> */}
								</ul>
							</div>
						)
					})}
				</div>

			</div>
		</>
	)
}

export default SongComments
