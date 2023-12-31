import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';

export default function Review() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  useEffect(() => {
    api.fetchMovieReview(movieId).then(({ results }) => {
      setData(results);

      setStatus('resolved');
    });
  }, [movieId]);

  if (status === 'resolved') {
    return data.length === 0 ? (
      <h1>There is no reviews</h1>
    ) : (
      <ul>
        {data.map(({ id, author, content }) => (
          <li key={id}>
            <h2>Author: {author}</h2>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    );
  }
}
