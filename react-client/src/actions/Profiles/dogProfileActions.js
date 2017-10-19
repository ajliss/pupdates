import axios from 'axios';

export const postDogs = (name, age, breed) => (dispatch) => {
  axios.post('http://localhost:8000/api/dogs', {
    name,
    age,
    breed,
  })
    .then((response) => {
      dispatch({ type: 'POST_DOG_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_DOG_REJECTED', payload: err });
    });
};

export const updateDogs = (name, age, breed, dogid) => (dispatch) => {
  axios.post(`http://localhost:8000/api/dogs/ + ${dogid}`, {
    name,
    age,
    breed,
  })
    .then((response) => {
      dispatch({ type: 'UPDATE_DOG_FULFILLED', payload: response.data[1] });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DOG_REJECTED', payload: err });
    });
};

