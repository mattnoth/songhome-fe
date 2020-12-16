import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { Typography } from '@material-ui/core';

const SongDetails = ( { match } ) => {
    
    const baseUrl = `https://blooming-earth-00957.herokuapp.com/`
    const [song, setSong] = useState({})

    const songId = match.params.id
    const songUrl = `${baseUrl}songs/${songId}`


    useEffect(function getSong() {
        Axios(songUrl)
            .then((data) => {
                console.log(data)
                setSong(data.data)
            })
            .catch((error) => {})
    })
    
    if (!song) {
        return (
            <div> Loading ... </div>
        )
    }
    return (
        <Typography variant='h1'>
            {song.name}
        </Typography>


            
        
    );
};

export default SongDetails;