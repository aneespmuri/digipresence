import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledHeader = props => {
  return (
    <View
      style={{
        height: 56,
        backgroundColor: '#B68A35',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

export default StyledHeader;

const styles = StyleSheet.create({});
