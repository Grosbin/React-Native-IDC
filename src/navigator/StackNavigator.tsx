import {useContext, useEffect, useState} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {BottonTabs} from './BottonTabs';
import {DetailPrayers} from '../screens/DetailPrayers';
import {ContentChants} from '../screens/ContentChants';
import {ThemeContex} from '../context/ThemeContex';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import auth from '@react-native-firebase/auth';
import {DetailBible} from '../screens/DetailBible';
import {DetailApp} from '../screens/DetailApp';
import {ResetPassword} from '../screens/ResetPassword';

export type RootStackParams = {
  BottonTabs: undefined;
  // MenuLateral: undefined;
  DetailPrayers: {title: string; data: string[]};
  ContentChants: {id: string; name: string; lyrics: string[]};
  LoginScreen: undefined;
  RegisterScreen: undefined;
  DetailBible: undefined;
  DetailApp: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {theme} = useContext(ThemeContex);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
          headerStyle: {
            elevation: 0,
          },
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}>
        {!user ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        ) : (
          <>
            <Stack.Screen name="BottonTabs" component={BottonTabs} />
            <Stack.Screen name="DetailPrayers" component={DetailPrayers} />
            <Stack.Screen name="ContentChants" component={ContentChants} />
            <Stack.Screen name="DetailBible" component={DetailBible} />
            <Stack.Screen name="DetailApp" component={DetailApp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
