import React, { useState } from 'react';
import axios from 'axios';

const MovieTrailerSearch = () => {
    const [movieTitle, setMovieTitle] = useState('');
    const [trailerId, setTrailerId] = useState('');

    const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube Data API key

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${movieTitle}+trailer&maxResults=1&type=video`
            );

            const firstVideoId = response.data.items[0]?.id.videoId;

            if (firstVideoId) {
                setTrailerId(firstVideoId);
            } else {
                setTrailerId(''); // Clear trailer ID if no results found
            }
        } catch (error) {
            console.error('Error searching for trailer:', error);
        }
    };

    return (
        <div>
            <h1>Movie Trailer Search</h1>
            <input
                type="text"
                placeholder="Enter movie title"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
            />
            <button onClick={handleSearch}>Search Trailer</button>
            {trailerId && (
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MovieTrailerSearch;
