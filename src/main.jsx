import React from 'react';
import ReactDOM from 'react-dom/client';
import MovieDetail from './components/movieDetail.jsx';
import SeriesDetail from './components/seriesDetail.jsx';
import About from './components/about.jsx';
import ActorDetail from './components/actorDetail.jsx';
import Series from './components/series.jsx';
import App from './App.jsx';
import ErrorPage from './components/errorPage.jsx';
import './tailwind.css';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/movie/:id',
    element: <MovieDetail />
  },
  {
    path: '/series/:id',
    element: <SeriesDetail />
  },
  {
    path: '/actor/:id',
    element: <ActorDetail />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/series',
    element: <Series />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
