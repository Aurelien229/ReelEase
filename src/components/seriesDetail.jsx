import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './footer.jsx';
import Navbar from './navbar.jsx';
import LoadingPage from './loadingPage.jsx';


const SeriesDetail = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchSeriesDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&append_to_response=credits,videos,recommendations`);
                const data = await response.json();
                setSeries(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching series details:', error);
            }
        };

        fetchSeriesDetails();
    }, [id]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (isLoading || !series) {
        return <LoadingPage />;
    }

    const {
        name,
        poster_path,
        overview,
        vote_average,
        first_air_date,
        seasons,
        videos,
        credits
    } = series;

    const videoKey = videos && videos.results ? videos.results.find(video => video.type === "Trailer" && video.site === "YouTube") : null;

    const cast = credits && credits.cast ? credits.cast.slice(0, 5) : [];

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-5 my-5 font_1 text-center md:max-w-4xl lg:max-w-7xl lg:mx-auto lg:my-20">
                <div className="md:flex md:justify-center md:mb-4 md:space-x-4">
                    <div className="md:w-1/3 md:pr-4 md:mb-4">
                        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={name} className="mb-4 mx-auto" />
                    </div>
                    <div className="md:w-2/3 md:text-center md:mb-4"><br />
                        <h1 className="text-2xl text-[#2092a4] font-bold mb-4 md:text-4xl">{name}</h1>
                        <p className="mb-4">{overview}</p>
                        <div className="mb-4">
                            <p className="mb-2">⭐ {vote_average.toFixed(1)}</p>
                            <p className="mb-2">Date de première diffusion: {first_air_date}</p>
                            <p className="mb-2">Nombre de saisons: {seasons.length}</p>
                        </div>
                        {videoKey && (
                            <div>
                                <div className="aspect-w-16 aspect-h-9 mb-4">
                                    <iframe
                                        className="mx-auto"
                                        width="335"
                                        height="215"
                                        src={`https://www.youtube.com/embed/${videoKey.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <button onClick={openModal} className="bg-[#2092a4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Casting
                                </button>
                                {showModal && (
                                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                        <div className="bg-white p-4 rounded-lg">
                                            <h2 className="text-xl font-bold">Casting :</h2>
                                            <ul>
                                                {cast.map(actor => (
                                                    <li key={actor.id}>
                                                        <Link to={`/actor/${actor.id}`}>{actor.name}</Link> ({actor.character})
                                                    </li>
                                                ))}
                                            </ul>
                                            <button onClick={closeModal} className="mt-4 bg-[#2092a4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Fermer
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SeriesDetail;

