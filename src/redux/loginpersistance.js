import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAuthState = async user => {
  try {
    // Store the user's authentication state (e.g., user ID token) in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user authentication state:', error);
  }
};

const retrieveAuthState = async () => {
  try {
    // Retrieve the user's authentication state from AsyncStorage
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving user authentication state:', error);
    return null;
  }
};

const removeAuthState = async () => {
  try {
    // Remove the user's authentication state from AsyncStorage
    await AsyncStorage.removeItem('user');
    alert('dssdsdf');
  } catch (error) {
    console.error('Error removing user authentication state:', error);
  }
};

export {storeAuthState, retrieveAuthState, removeAuthState};
