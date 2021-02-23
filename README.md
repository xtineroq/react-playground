# react-playground
Reactjs, Hooks, Redux, Redux Saga, React Routing, Animations, Next.js


REDUX - state management container independent of React, must be immutable
```
npm install --save redux //install redux
import { createStore } from 'redux'; //import redux.createStore to application

npm install --save react-redux //hook up redux store to application
import { Provider } from 'react-redux'; //inject store to react components
import { connect } from 'react-redux'; //function which returns an HOC
```

REDUX BASIC (Node example)
```
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
```

CONNECTING STATE AND DISPATCH TO PROPS
```
const mapStateToProps = state => {
    return {
        personsState: state.persons
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: () => dispatch({type: 'ADD'}),
        onDelete: (id) => dispatch({type: 'DELETE', personId: id})
    }
};
```

COMBINING MULTIPLE REDUCERS
```
import { combineReducers } from 'redux'; //merges multiple reducers
import counterReducer from './store/reducers/counter'; //import reducer 1
import resultReducer from './store/reducers/result'; //import reducer 2

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const store = createStore(rootReducer);
```

ADVANCED REDUX
```
import { applyMiddleware } from 'redux';

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

const store = createStore(rootReducer, applyMiddleware(logger)); //enhancer
```

ACTION CREATORS & ASYNC HANDLING
```
/**container**/
import * as actionCreators from '[path]';

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onAddCounter: () => dispatch(actionCreators.add(10)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
};

/**action**/

// basic
export const increment = () => {
    return {
        type: INCREMENT
    };
};

// with payload
export const subtract = ( value ) => {
    return {
        type: SUBTRACT,
        val: value
    };
};

// async code using redux-thunk
export const saveResult = ( res ) => {
    return {
        type: STORE_RESULT,
        result: res
    };
}

export const storeResult = ( res ) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(saveResult(res));
        }, 2000 );
    }
};

/**index**/
// [npm i redux-thunk]
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
```

USING REDUX DEVTOOLS
```
import { compose } from 'redux'; // merge enhancers

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
```

REDUX SAGA

`npm install --save redux-saga`

```
/** Sagas are kind of functions which you run on certain actions and handle side-effect logics
    eg. accessing local storage, reaching out to server, changing the route
    They don't directly manipulate the redux store - they might do something which leads to a different state
    which in the end is stored in the redux store but they are not directly consumed by the reducer. **/

/** Generators are next generation javascript features which are functions which can be executed incrementally, can be called and
    don't run from start to end immediately, but can be paused during function execution e.g. to wait for async code to finish. **/

/**index**/
import createSagaMiddleware from "redux-saga"; // create middleware
import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/sagas"; //import watchers

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

/**sagas folder**/
import { delay } from "redux-saga";
import { put, call } from "redux-saga/effects"; //helpers

// simple generators
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

// with a try catch to replace .then
export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}

/**sagas folder - index**/
import { takeEvery, all, takeLatest } from "redux-saga/effects";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order"; // import sagas

// takeLatest to only watch for the last actionType
export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

// use all to replace writing yield for each line
export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}
```
NEXT JS
