import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';

const store = createStore((state = [], action) => [...state, action.add])

function ReduxUpdater() {
  const dispatch = useDispatch()
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'update', add: 'ddd' })
        }}
      >
        click me
      </button>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ReduxUpdater />
    </Provider>
  );
}

export default App;
