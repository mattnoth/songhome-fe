import React, { useState } from 'react'

import Axios from 'axios'

const SongComments = ({ song, setSong, baseUrl }) => {
	const songId = song.id

	const songUrl = `${baseUrl}songs/`

	const [formState, setFormState] = useState({
		text: '',
		song_name: '',
	})

	const handleChange = (event, plant_id) => {
		setFormState({
			...formState,
			[event.target.id]: event.target.value,
			songId: songId,
		})
	}

	const handlePostComment = function () {
		const data = formState

		Axios.post(songUrl, data)
			.then((response) => console.log(response))

			.then(() => {
				fetch()
					.then((res) => res.json())
					.then((res) => {
						console.log(res)
					})
					.catch(console.error)
			})
    }
    
    const handleDeleteComment = function (event, commentId) {
            // const deleteUrl = `${commentsUrl}/`
            
            Axios.delete(deleteUrl)
            
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
				<input
					type='text'
					id='song_name'
					placeholder='Name'
					onChange={handleChange}
				/>
				<input
					type='textarea'
					id='text'
					placeholder=''
					onChange={handleChange}
				/>
			</form>
			<div className='comment-container'>
				<div>
					{song.comments?.map((comment) => {
						return (
							<div className='container' key={comment.id}>
								<ul>


									<li className='name'>
										{comment.text}
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
				<button  className='button-join' onClick={handleShow}>
					Join the Babble!
				</button>
			</div>
		</>
	)
}

export default SongComments
