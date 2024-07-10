import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store/store'
import ToDoList from './src/screen/Todolist/ToDoList'

const App = () => {
  return (
  <Provider store={store}>
    <ToDoList />
  </Provider>
  )
}

export default App