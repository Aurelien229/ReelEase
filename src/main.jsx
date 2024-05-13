import React from 'react';
import ReactDOM from 'react-dom/client';
import MovieDetail from './components/movieDetail.jsx';
import App from './App.jsx';
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
    errorElement: <div>404</div>
  },
  {
    path: '/movie/:id',
    element: <MovieDetail />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
