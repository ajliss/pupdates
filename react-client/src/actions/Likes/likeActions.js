import axios from 'axios';

// get the dogsLiked array from user (userid is somehow stored when login)
export function getUser(userid) {
  return function(dispatch) {
    axios.get('/api//users/' + userid)
      .then(({ data }) => {
        console.log(data); // TODO: alter the data to only get the dogsLiked array
        dispatch({type: 'FETCH_DOGS_LIKED_FULFILLED', payload: data});
      })
      .catch(err => { 
        dispatch({type: 'FETCH_DOGS_LIKED_REJECTED', payload: err});
      });
  };
};

// get dog's name and picture from dogId's in the dogsLiked array
export function getUser(dogid) {
    return function(dispatch) {
      axios.get('/api//dogs/' + dogid)
        .then(({ data }) => {
          console.log(data); // TODO: alter the data to only get the dog's name & pic
          dispatch({type: 'FETCH_DOG_FULFILLED', payload: data});
        })
        .catch(err => { 
          dispatch({type: 'FETCH_DOG_REJECTED', payload: err});
        });
    };
  };

// delete a dog from the dogsLiked array
// TODO: but rn it's deleting a dog completely -_- !!!!
export function removeDog(dogid) {
  return function(dispatch) {
    axios.delete('api/dogs/' + dogid)
      .then((response) => {
        dispatch({type: 'DELETE_DOG_FULFILLED', payload: response.data});
        dispatch({type: 'NEW_DOG_POSTED'});
      })
      .catch(err => {
        dispatch({type: 'DELETE_DOG_REJECTED', payload: err});
      });
  };
};