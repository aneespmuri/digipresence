import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const StyledTextinput = ({placeholder, keyboardType, onChangeText}) => {
  return (
    <TextInput
      style={{
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dfdfdf',
      }}
      placeholderTextColor="#6D6D6D"
      placeholder={placeholder}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
    />
  );
};

export default StyledTextinput;

const styles = StyleSheet.create({});
