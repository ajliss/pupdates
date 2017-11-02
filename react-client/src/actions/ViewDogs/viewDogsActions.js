import axios from 'axios';

export const getAllUnseenDogs = (userid, coords) => (dispatch) => {
  axios.get(`http://localhost:8000/api/newdogs/${userid}`)
    .then((result) => {
      axios.get(`http://localhost:8000/api/users/${result.data[0].owner}`)
        .then(({ data }) => {
          axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${coords[0]},${coords[1]}&destinations=${data[0].coords[0]},${data[0].coords[1]}&key=AIzaSyB1S52rdgtYi-52GK2b149DGxAZb_rKGdY`)
            .then((response) => {
              const value = response.data.rows[0].elements[0].distance.text;
              dispatch({ type: 'FETCH_ALL_UNSEEN_DOGS_FULFILLED', payload: [result.data, value] });
            });
        });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ALL_UNSEEN_DOGS_REJECTED', payload: err });
    });
};

export const findDistance = (coords, dog) => (dispatch) => {
  axios.get(`http://localhost:8000/api/users/${dog.owner}`)
    .then(({ data }) => {
      axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${coords[0]},${coords[1]}&destinations=${data[0].coords[0]},${data[0].coords[1]}&key=AIzaSyB1S52rdgtYi-52GK2b149DGxAZb_rKGdY`)
        .then((response) => {
          const value = response.data.rows[0].elements[0].distance.text;
          dispatch({ type: 'UPDATE_DISTANCE_TO_DOG', payload: value });
        });
    })
    .catch((err) => {
      dispatch({ type: 'FIND_DISTANCE_FAILED', payload: err });
    });
};

export const updateDogsSeen = (userid, dogid, coords) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/users/seendogs/${userid}`, {
    dogid,
  })
    .then(() => {
      dispatch({ type: 'UPDATE_SEEN_DOGS_FULFILLED', payload: dogid });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_SEEN_DOGS_REJECTED', payload: err });
    });
};

export const updateLikedDogs = (userid, dogid) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/users/likeddogs/${userid}`, {
    dogid,
  })
    .then(() => {
      dispatch({ type: 'UPDATE_LIKED_DOGS_FULFILLED', payload: dogid });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_LIKED_DOGS_REJECTED', payload: err });
    });
};
