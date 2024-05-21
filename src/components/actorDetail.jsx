import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Footer from './footer.jsx';
import Navbar from './navbar.jsx';
import LoadingPage from './loadingPage.jsx';
import Card from './card.jsx';
import 'swiper/swiper-bundle.css';




const ActorDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const actorResponse = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
        const actorData = await actorResponse.json();

        const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
        const creditsData = await creditsResponse.json();

        setActor(actorData);
        setCredits(creditsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (isLoading || !actor || !credits) {
    return <LoadingPage />;
  }

  const middleIndex = Math.floor(credits.cast.length / 2);

  const {
    name,
    profile_path,
    birthday,
    place_of_birth
  } = actor;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-5 my-5 font_1 text-center md:mx-auto lg:my-20">
        <div className="flex flex-col md:flex-row md:justify-center md:mb-4 md:space-x-4">
          <div className="md:w-1/3 md:pr-4 md:mb-4">
            <h1 className="text-2xl text-[#2092a4] font-bold mb-4 md:text-4xl">{name}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} className="mb-4 mx-auto" />
          </div>
          <div className="md:w-2/3 md:mb-4 md:flex md:flex-col md:justify-between">
            <div className="md:text-center">

              <div className="mb-4">
                <p className="mb-2">Date de naissance: {birthday}</p>
                <p className="mb-2">Lieu de naissance: {place_of_birth}</p>
                
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <h2 className="text-xl text-[#2092a4] font-bold mb-4 md:text-3xl">Filmographie</h2>
            </div>
            <Swiper
              effect={'coverflow'}
              autoplay={{ delay: 3500 }}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={middleIndex}
              coverflowEffect={{
                stretch: 0,
                rotate: 0,
                depth: 100,
                modifier: 3.5,
              }}
              modules={[EffectCoverflow, Autoplay]}
            >
              {credits.cast.map((movie) => (
                <SwiperSlide className="my-5 swiper" key={movie.id}>
                  <Card
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    overview={movie.overview}
                    vote_average={movie.vote_average}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ActorDetail;
