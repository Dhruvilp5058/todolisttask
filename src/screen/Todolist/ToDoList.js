import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, markTaskDone } from '../../redux/slice/slice';
import TaskForm from '../../component/TaskForm';

const ToDoList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (task) => {
    dispatch(addTask({ ...task, id: Date.now().toString() }));
  };

  const handleEditTask = (id, task) => {
    dispatch(editTask({ id, ...task }));
    setEditingTask(null); 
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleMarkTaskDone = (id) => {
    dispatch(markTaskDone(id));
  };

  const startEditingTask = (task) => {
    setEditingTask(task);
  };

  return (
    <View>
      {editingTask ? (
        <TaskForm
          initialTask={editingTask}
          onSubmit={(task) => handleEditTask(editingTask.id, task)}
        />
      ) : (
        <TaskForm onSubmit={handleAddTask} />
      )}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskContainer, item.done && styles.taskDone]}>
            <Text style={item.done ? styles.taskTextDone : styles.taskText}>{item.title}</Text>
            <Text>{new Date(item.date).toLocaleString()}</Text>
            <Button title="Edit" onPress={() => startEditingTask(item)} />
            <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
            <Button title={item.done ? "Undone" : "Done"} onPress={() => handleMarkTaskDone(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  taskDone: {
    backgroundColor: '#d3ffd3',
  },
  taskText: {
    fontSize: 18,
    color:'black'
  },
  taskTextDone: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default ToDoList;
