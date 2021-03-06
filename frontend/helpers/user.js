import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export async function setUser(user){
 await AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function getUser() {
    let userData = await AsyncStorage.getItem('user');
    let data = JSON.parse(userData)
    return data
}