import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import StyledPicker from './Component/StyledPicker';
import StyledTextInput from './Component/StyledTextInput';

const App = () => {
  const [data, setdata] = useState('');

  useEffect(() => {
    handleApi();
  }, []);

  const handleApi = () => {
    //
    fetch('https://api.npoint.io/0975576e8aaef7a2ec02')
      .then(response => response.json())
      .then(json => {
        const Array =
          json?.Result?.FormStages[0]?.Sections[0]?.FieldInformations;
        const newArray = Array.map(i => ({...i, Value: null}));
        setdata(newArray);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderFields = ({item, index}) => {
    return (
      <View>
        {item.Type === 'text' ||
        item.Type === 'email' ||
        item.Type === 'number' ? (
          <View>
            <Text>
              {item.NameAr}
              {item.IsMandatory && <Text style={{color: '#FF0707'}}> * </Text>}
            </Text>

            <StyledTextInput
              placeholder={item.NameAr}
              keyboardType={item.Type === 'number' ? 'numeric' : 'default'}
              onChangeText={inputValue => {
                item.Value = inputValue;
                setdata([...data]);
              }}
            />
          </View>
        ) : item.Type === 'dropdown' ? (
          <>
            <Text>
              {item.NameAr}
              {item.IsMandatory && <Text style={{color: '#FF0707'}}> * </Text>}
            </Text>
            <StyledPicker url={item.DataFillFrom} />
          </>
        ) : null}
        <View style={{marginBottom: 10}} />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#EDEDF0'}}>
      <StatusBar backgroundColor="#B68A35" />
      <View style={{backgroundColor: '#B68A35'}}>
        <Text style={{color: '#fff', textAlign: 'center', paddingVertical: 20}}>
          Working
        </Text>
      </View>
      <Text style={{padding: 20}}>Fields marked with (*) are mandatory</Text>
      <View style={styles.flatListWrpr}>
        <FlatList
          removeClippedSubviews={false}
          renderItem={renderFields}
          data={data}
          keyExtractor={(i, index) => `key${index}`}
          contentContainerStyle={{padding: 20}}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  flatListWrpr: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
