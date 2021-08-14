import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  StatusBar,
  View,
  Pressable,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

import StyledHeader from './Component/StyledHeader';
import StyledTextInput from './Component/StyledTextInput';
import StyledPicker from './Component/StyledPicker';
import StyledButton from './Component/StyledButton';

const App = () => {
  const [data, setdata] = useState('');
  const [maxLength, setMaxLength] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responsedata, setResponse] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [type, setType] = useState('date');
  const [singleFile, setSingleFile] = useState('');

  const [storedData, setStoredData] = useState('');

  useEffect(() => {
    handleApi();
  }, []);

  useEffect(() => {
    handleData();
  }, [responsedata, currentIndex]);

  const handleApi = () => {
    axios
      .get('https://api.npoint.io/0975576e8aaef7a2ec02')
      .then(response => {
        setMaxLength(response.data.Result.FormStages.length - 1);
        setResponse(response.data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const handleData = () => {
    const sections = [];

    responsedata?.Result?.FormStages[currentIndex]?.Sections?.map(i => {
      const obj = {};
      obj.title = i?.NameAr;
      obj.data = i.FieldInformations;
      i.FieldInformations.push({value: null});
      sections.push(obj);
    });
    setdata(sections);
  };

  console.log(JSON.stringify(data));

  const handleNextButton = type => {
    if (type === 'increment') {
      if (currentIndex !== maxLength) {
        setCurrentIndex(currentIndex + 1);
        handleData();
      }
    } else if (type === 'decrement') {
      setCurrentIndex(currentIndex - 1);
    } else {
      alert('suuceessfully submitted');
    }
  };

  const showDatePicker = type => {
    // console.log(type);
    setType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSingleFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const inputtFeild = ['text', 'email', 'url', 'number', 'textarea'];
  const picker = ['dropdown'];
  const dateTimePicker = ['date', 'time', 'datetime-local', 'month'];

  const handleOnchangeValues = (id, value) => {
    setStoredData([...storedData, {id, value}]);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>
          {item.NameAr}
          {item.IsMandatory && <Text style={{color: '#FF0707'}}> * </Text>}
        </Text>
        <View>
          {inputtFeild.includes(item.Type) ? (
            <View>
              <StyledTextInput
                placeholder={item.NameAr}
                keyboardType={item.Type === 'number' ? 'numeric' : 'default'}
                onChangeText={value =>
                  handleOnchangeValues(item.FieldInformationId, value)
                }
              />
            </View>
          ) : picker.includes(item.Type) ? (
            <>
              <StyledPicker url={item.DataFillFrom} />
            </>
          ) : dateTimePicker.includes(item.Type) ? (
            <Pressable
              onPress={() => {
                console.log(item.Type);
                item.Type === 'date' || item.Type === 'month'
                  ? showDatePicker('date')
                  : item.Type === 'time'
                  ? showDatePicker('time')
                  : item.Type === 'datetime-local'
                  ? showDatePicker('datetime')
                  : null;
              }}
              style={styles.textinputStyle}>
              <Text style={{color: '#6D6D6D'}}>Select {item.Type}</Text>
              <Icon name="chevron-down" size={12} color="#6D6D6D" />
            </Pressable>
          ) : item.Type === 'file' ? (
            <Pressable onPress={selectOneFile} style={styles.filePickerWrpr}>
              <Icon name="plus" size={12} color="#6D6D6D" />
            </Pressable>
          ) : null}
          <View style={{marginBottom: 10}} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B68A35" />
      <StyledHeader
        title={responsedata?.Result?.FormStages[currentIndex].NameEn}
      />
      <Text style={{padding: 20}}>Fields marked with (*) are mandatory</Text>
      <View style={styles.sectionListWrpr}>
        <Text style={{color: '#B78B24', fontSize: 12, paddingBottom: 10}}>
          Step 1 of 3
        </Text>
        <SectionList
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{fontWeight: 'bold', color: '#B78B24', paddingBottom: 8}}>
              {title}
            </Text>
          )}
          keyExtractor={(item, index) => item + index}
        />
        <View style={styles.btnWrpr}>
          <View style={{flex: 1}}>
            {currentIndex > 0 ? (
              <View style={{alignSelf: 'flex-start'}}>
                <StyledButton
                  onPress={() => handleNextButton('decrement')}
                  title="Previous"
                />
              </View>
            ) : null}
          </View>
          {currentIndex === maxLength ? (
            <StyledButton
              onPress={() => handleNextButton('finish')}
              title="Finish"
            />
          ) : (
            <StyledButton
              onPress={() => handleNextButton('increment')}
              title="Next"
            />
          )}
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={type}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDF0',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  sectionListWrpr: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  btnWrpr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  textinputStyle: {
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    height: 50,
    // justifyContent: 'center',
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filePickerWrpr: {
    height: 55,
    width: 80,
    borderColor: '#B68A35',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});

export default App;
