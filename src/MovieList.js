import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const MovieList = () => {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/movie/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedMovies = [...movies].filter(i => i.id !== id);
      setMovies(updatedMovies);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const movieList = movies.map(movie => {
    return <tr key={movie.id}>
      <td style={{whiteSpace: 'nowrap'}}>{movie.movieTitle}</td>
      <td>{movie.movieGenre}</td>
      <td>{movie.movieYear}</td>
      <td>{movie.movieLength}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/movie/" + movie.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(movie.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/movie/new">Add Movie</Button>
        </div>
        <h3>Movie Management System</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Title</th>
            <th width="20%">Genre</th>
            <th>Year</th>
            <th width="10%">Length</th>
          </tr>
          </thead>
          <tbody>
          {movieList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default MovieList;