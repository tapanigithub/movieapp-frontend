import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const MovieEdit = () => {
  const initialFormState = {
    movieTitle: '',
    movieGenre: '',
    movieYear: '',
    movieLength: ''
  };

  const [movie, setMovie] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/movie/${id}`)
        .then(response => response.json())
        .then(data => setMovie(data));
    }
  }, [id, setMovie]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setMovie({ ...movie, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/movie${movie.id ? `/${movie.id}` : ''}`, {
        method: (movie.id) ? 'PUT' : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
      });
      setMovie(initialFormState);
      navigate('/movies');
  }

  const title = <h2>{movie.id ? 'Edit Movie' : 'Add Movie'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="movieTitle">Title</Label>
            <Input type="text" name="movieTitle" id="movieTitle" value={movie.movieTitle}
                   onChange={handleChange} autoComplete="movieTitle"/>
          </FormGroup>
          <FormGroup>
            <Label for="movieGenre">Genre</Label>
            <Input type="text" name="movieGenre" id="movieGenre" value={movie.movieGenre}
                   onChange={handleChange} autoComplete="movieGenre"/>
          </FormGroup>
          <FormGroup>
            <Label for="movieYear">Year</Label>
            <Input type="text" name="movieYear" id="movieYear" value={movie.movieYear}
                   onChange={handleChange} autoComplete="movieYear"/>
          </FormGroup>
          <FormGroup>
            <Label for="movieLength">Length</Label>
            <Input type="text" name="movieLength" id="movieLength" value={movie.movieLength}
                   onChange={handleChange} autoComplete="movieLength"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/movies">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default MovieEdit;