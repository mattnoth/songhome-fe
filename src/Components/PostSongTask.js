import React, { useState } from 'react'
import Axios from 'axios'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const PostSongTask = ({ song, getSong }) => {
    // const commentUrl = `http://localhost:8000/comments/`

    const commentUrl = 'https://blooming-earth-00957.herokuapp.com/comments/'

    const initialFormState = {
			text: '',
			song: '',
		}
	const [formState, setFormState] = useState(initialFormState)

	const handleChange = (event, plant_id) => {
		setFormState({
			...formState,
			[event.target.id]: event.target.value,
			song: song.id,
		})
	}

	const handlePostComment = function (e) {
		const data = formState
		e.preventDefault()

        Axios.post(commentUrl, data).then((response) => 
        getSong(),
        setFormState(initialFormState)
        
        
        )
	}
	return (
		<form action='submit' onSubmit={handlePostComment}>
			<TextField
				type='textarea'
				id='text'
				label='new task'
				onChange={handleChange}
				style={{
					width: '30vw',
                    position: 'bottom',
            
				}}
			/>
			<Button type='submit'>Post Task</Button>
		</form>
	)
}

export default PostSongTask
