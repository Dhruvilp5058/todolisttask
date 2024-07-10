import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, markTaskDone } from '../../redux/slice/slice';
import TaskForm from '../../component/TaskForm';

const ToDoList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask({ ...task, id: Date.now().toString() }));
  };

  const handleEditTask = (id, task) => {
    dispatch(editTask({ id, ...task }));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleMarkTaskDone = (id) => {
    dispatch(markTaskDone(id));
  };

  return (
    <View>
      <TaskForm onSubmit={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <Button title="Edit" onPress={() => handleEditTask(item.id, item)} />
            <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
            <Button title="Done" onPress={() => handleMarkTaskDone(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ToDoList;
