import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const StyledPicker = ({selectedLanguage, onValueChange, url}) => {
  const [data, setdata] = useState([1]);
  useEffect(() => {
    dropdownValue();
  }, []);

  const dropdownValue = () => {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setdata(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Picker
      mode={'dropdown'}
      selectedValue={selectedLanguage}
      onValueChange={onValueChange}>
      <Picker.Item label={'Select'} value={null} />

      {data?.Result?.map(i => (
        <Picker.Item label={i.DisplayText} value={i.Id} />
      ))}
    </Picker>
  );
};

export default StyledPicker;

const styles = StyleSheet.create({});
