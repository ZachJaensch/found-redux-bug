import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';

import createConnectedRouter from 'found/lib/createConnectedRouter';
import foundReducer from 'found/lib/foundReducer';
import FarceActions from 'farce/lib/Actions';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import resolver from 'found/lib/resolver';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import Matcher from 'found/lib/Matcher';
import createRender from 'found/lib/createRender';

// const store = createStore((state = [], action) => [...state, action.add])

function ReduxUpdater() {
  const dispatch = useDispatch()
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          other.dispatch({ type: 'ADD' })
        }}
      >
        add
      </button>
      <button
        type="button"
        onClick={() => {
          other.dispatch({ type: 'REMOVE' })
        }}
      >
        remove
      </button>
    </div>
  )
}

function Input() {
  const [val, setVal] = useState('')
  return <input value={val} onChange={e => setVal(e.target.value)} />
}

function App() {
  const sel = useSelector(st => st.app)
  console.log(sel)
  return (
    <>
      <Input />
      <ReduxUpdater />
    </>
  )
}

function appReducer(state = { some: [] }, action) {
  switch (action.type) {
    case 'ADD': return { some: ['added'] }
    case 'REMOVE': return { some: [] }
  }
  return state
}

const store = createStore(
  combineReducers({
    found: foundReducer,
    app: appReducer
  }),
  compose(
    createHistoryEnhancer({
      protocol: new BrowserProtocol(),
      middlewares: [queryMiddleware],
    }),
    createMatchEnhancer(new Matcher([
      {
        path: '/',
        Component: App,
      }
    ])),
  ),
);

store.dispatch(FarceActions.init());

var other = store

const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError: ({ error }) => (
      <div>{error.status === 404 ? 'Not found' : 'Error'}</div>
    ),
  }),
});

export default function () {
  return (
    <Provider store={store}>
      <ConnectedRouter resolver={resolver} />
    </Provider>
  );
}



