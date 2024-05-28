import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import LoadingPage from './components/loadingPage.jsx';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

function App() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingMovies();
    fetchTopRatedMovies();
    fetchTopRatedTVShows();
  }, []);

  const fetchUpcomingMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        }
      });
      setUpcomingMovies(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération des prochaines sorties :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopRatedMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        }
      });
      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération des films les mieux notés :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopRatedTVShows = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated', {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
        }
      });
      setTopRatedTVShows(response.data.results);
    } catch (error) {
      console.error('Erreur lors de la récupération des séries les mieux notées :', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white text-[#01030d] px-5">
        <div className="container mx-auto py-10 text-center">
          <h2 className="text-4xl font-bold mb-8 font_1">
            <span className="text-[#2092a4] font_2 text-8xl font-bold">U</span>
            <span>pcoming</span>
          </h2>
          <Swiper
            effect={'coverflow'}
            autoplay={{ delay: 3500 }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3,
                initialSlide: 2 }
            }}
            coverflowEffect={{
              stretch: 0,
              rotate: 0,
              depth: 100,
              modifier: 3.5,
            }}
            modules={[EffectCoverflow, Autoplay]}
          >
            {upcomingMovies.map(movie => (
              <SwiperSlide key={movie.id}>
                <div className="flex justify-center">
                  <Link to={`/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <h2 className="text-4xl font-bold mb-8 font_1">
            <span className="text-[#2092a4] font_2 text-8xl font-bold">T</span>
            <span>op-rated films</span>
          </h2>
          <Swiper
            effect={'coverflow'}
            autoplay={{ delay: 3500 }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3,
                initialSlide: 2 }
            }}
            coverflowEffect={{
              stretch: 0,
              rotate: 0,
              depth: 100,
              modifier: 3.5,
            }}
            modules={[EffectCoverflow, Autoplay]}
          >
            {topRatedMovies.map(movie => (
              <SwiperSlide key={movie.id}>
                <div className="flex justify-center">
                  <Link to={`/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <h2 className="text-4xl font-bold mb-8 font_1">
            <span className="text-[#2092a4] font_2 text-8xl font-bold">T</span>
            <span>op-rated series</span>
          </h2>
          <Swiper
            effect={'coverflow'}
            autoplay={{ delay: 3500 }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3,
                initialSlide: 2 }
            }}
            coverflowEffect={{
              stretch: 0,
              rotate: 0,
              depth: 100,
              modifier: 3.5,
            }}H
            modules={[EffectCoverflow, Autoplay]}
          >
            {topRatedTVShows.map(show => (
              <SwiperSlide key={show.id}>
                <div className="flex justify-center">
                  <Link to={`/series/${show.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
