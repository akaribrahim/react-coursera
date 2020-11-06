
import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Dishes} from './dishesReducer';
import {Comments} from './commentsReducer';
import {Promotions} from './promotionsReducer';
import {Leaders} from './leadersReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders
      }),
      applyMiddleware(thunk, logger)
    );

    return store;
};