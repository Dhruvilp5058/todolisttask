import React, { useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskForm = ({ onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [date, setDate] = useState(initialTask ? new Date(initialTask.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const handleSubmit = () => {
    onSubmit({ title, date: date.toISOString() });
  };

  return (
    <View>
      <TextInput placeholder="Task Title" value={title} onChangeText={setTitle} />
      <Button onPress={() => setShowPicker(true)} title="Select Date/Time" />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button onPress={handleSubmit} title="Save Task" />
    </View>
  );
};

export default TaskForm;
