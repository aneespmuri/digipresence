import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const StyledButton = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        backgroundColor: '#B68A35',
        width: 100,
        borderRadius: 30,
      }}>
      <Text
        style={{
          color: '#fff',
          paddingVertical: 10,
          textAlign: 'center',
        }}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default StyledButton;

const styles = StyleSheet.create({});
