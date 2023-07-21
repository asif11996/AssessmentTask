import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import {hp, wp} from '../constants/Dimentions';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {retrieveAuthState, removeAuthState} from '../redux/loginpersistance';

const HomeScreen = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);

  // Load todos from local storage on initial render
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to local storage whenever todos array changes
  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('@todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos: ', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos: ', error);
    }
  };

  const handleAddTodo = () => {
    if (todoText.trim() === '') {
      Alert.alert('Error', 'Todo text cannot be empty.');
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      text: todoText,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTodoText('');
  };

  const handleRemoveTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleRemoveAllTodo = () => {
    setTodos([]);
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <View style={{alignSelf: 'flex-end', paddingBottom: hp(2)}}>
        <TouchableOpacity
          onPress={removeAuthState}
          style={{
            width: wp(25),
            height: hp(5),
            borderRadius: wp(1.2),
            backgroundColor: '#425f9b',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: ' Klavika',
              fontWeight: '900',
              // textAlign: 'center',
              // backgroundColor: '#fff',
            }}>
            SIGN OUT
          </Text>
        </TouchableOpacity>
        {/* <Button onPress={submitHandler}>{'Log out'}</Button> */}
        {/* <Icon name="rocket" size={30} color="#900" /> */}
      </View>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#000',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
        placeholder="Add your todo here"
        value={todoText}
        onChangeText={setTodoText}
      />
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'stretch',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={handleAddTodo}
          style={{
            width: wp(25),
            height: hp(5),
            borderRadius: wp(1.2),
            backgroundColor: '#005c4f',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp(1),
          }}>
          <Text
            style={{
              color: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: ' Klavika',
              fontWeight: '900',
              // textAlign: 'center',
              // backgroundColor: '#fff',
            }}>
            ADD TODO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRemoveAllTodo}
          style={{
            width: wp(25),
            height: hp(5),
            borderRadius: wp(1.2),
            backgroundColor: '#005c4f',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp(1),
          }}>
          <Text
            style={{
              color: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: ' Klavika',
              fontWeight: '900',
              // textAlign: 'center',
              // backgroundColor: '#fff',
            }}>
            REMOVE ALL
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        // style={{marginVertical}}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
              <BouncyCheckbox
                size={25}
                fillColor="#2a8bfd"
                unfillColor="#FFFFFF"
                text="Custom Checkbox"
                iconStyle={{borderColor: 'red'}}
                // innerIconStyle={{borderWidth: 2}}
                textStyle={{fontFamily: 'JosefinSans-Regular'}}
                onPress={(isChecked: boolean) => {}}
                disableText={true}
                // textContainerStyle={{flex: 1}}
              />
              {/* <CheckBox
                texts={'Does this report require further attention?'}
                key={10}
                // value={firstIsChecked}
                //            disableBuiltInState={disableBuiltInState}
                // onPresses={() => {
                //   setAttentioncheckbox(
                //     attentioncheckbox == 'No' ? 'Yes' : 'No',
                //   ),
                //     setFirstIsChecked(!firstIsChecked);
                //   Keyboard.dismiss();
                // }}
              /> */}
              {/* <Text style={{color: 'red'}}>Remove Todo</Text> */}
            </TouchableOpacity>
            <View
              style={{
                width: '83%',
                height: hp(5),
                backgroundColor: 'yellow',
                borderRadius: 5,
                justifyContent: 'center',
                paddingHorizontal: wp(2),
                backgroundColor: '#82c9b6',
              }}>
              <Text style={{color: '#000'}}>{item.text}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
              <Icon
                name="cross"
                size={20}
                color="#000"
                style={{
                  backgroundColor: '#00ffff',
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: 'red',
                }}
              />

              {/* <Text style={{color: 'red'}}>Remove Todo</Text> */}
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
