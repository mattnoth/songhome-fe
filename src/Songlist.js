import React, { useState, useEffect } from 'react';
import Songcard from './Songcard'
import Axios from 'axios';

const Songlist = ({routerProps }) => {

    const [songlist, setSonglist ] = useState([]) 

        const url = `localhost:8000/songs/`   

        useEffect(function () {
					// console.log(process.env.NODE_ENV)
					Axios('http://localhost:8000/songs/')
						.then((data) => {
                            console.log(data)
                            setSonglist(data.data)
						})
						.catch(console.error)
					//eslint-disable-next-line
				}, [])
    return (
        <div class='songlist-container'>
            {songlist.map((song) => (
                <Songcard song={song} key={song.id} />
            ))}
        </div>
    );
};

export default Songlist;