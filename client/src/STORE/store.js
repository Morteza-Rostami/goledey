// older method:
import { applyMiddleware, compose, createStore } from 'redux';
// redux tool-kit newer method:
//import { configureStore } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react'
// async action
import thunk from 'redux-thunk';
// reducer
import rootReducer from '../REDUCERS/indexReducder.js';


const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store:
const store = 
  createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)));

// subscribe a callBack to run when store gets an action.
//store.subscribe(() => console.log('store updated: ', store.getState()));

// connect component with redux.store.state
// first argument cat be null: connect(null, mapDispatchToProps)
//const Form = connect(null, mapDispatchToProps)(ConnectedForm); 
// directly: passing action -> fetchProducts into connect()
//const List = connect(mapListStateToProps, {fetchProducts})(ConnectedList);

export default store;
//export { Form, List }

/* 

# concepts in redux:
==

# store
# action object
# action creator
# reducer
# constants
# store.dispatch
# store.getState
# store.subscribe
# connect()
  # mapStateToprops
  # mapDispatchToProps
# middleware
# aynchronous actions
# redux toolkit

# redux toolkit:
==







*/