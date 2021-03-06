import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    console.log(newComment);
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(response => {console.log(response); dispatch(addComment(response));})
        .catch(error => {console.log('Post comments', error.message)
            alert('Your comment could not be posted \n Error: '+error.message)});
}




export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl+'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
   type: ActionTypes.DISHES_LOADING 
});

export const dishesFailed = (errMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMessage
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});






export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addComments(dishes)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMessage
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});






export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl+'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error '+ response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addPromos(dishes)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
   type: ActionTypes.PROMOS_LOADING 
});

export const promosFailed = (errMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMessage
});
 
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});