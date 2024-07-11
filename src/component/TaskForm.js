import React, { useState } from 'react';
import { View, TextInput, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskForm = ({ onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [date, setDate] = useState(initialTask ? new Date(initialTask.date) : null);
  const [time, setTime] = useState(initialTask ? new Date(initialTask.date) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  const handleSubmit = () => {
    if (title && date && time) {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );
      onSubmit({ title, date: combinedDateTime.toISOString() });
      // Reset the form fields
      setTitle('');
      setDate(null);
      setTime(null);
    } else {
      alert("Please fill in all fields");
    }
  };

  const formatDate = (date) => {
    return date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : 'Select Date';
  };

  const formatTime = (time) => {
    if (!time) return 'Select Time';
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <View>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button onPress={() => setShowDatePicker(true)} title={formatDate(date)} />
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Button
        onPress={() => setShowTimePicker(true)}
        title={formatTime(time)}
      />
      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <Button onPress={handleSubmit} title="Save Task" />
    </View>
  );
};

export default TaskForm;
