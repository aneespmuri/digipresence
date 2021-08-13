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
    <View style={{borderBottomColor: '#dfdfdf', borderBottomWidth: 1}}>
      <Picker
        mode={'dropdown'}
        selectedValue={selectedLanguage}
        onValueChange={onValueChange}>
        <Picker.Item
          label={'Select'}
          value={null}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        />

        {data?.Result?.map(i => (
          <Picker.Item label={i.Name} value={i.Id} />
        ))}
      </Picker>
    </View>
  );
};

export default StyledPicker;

const styles = StyleSheet.create({
  pickerItem: {
    padding: 0,
  },
});
