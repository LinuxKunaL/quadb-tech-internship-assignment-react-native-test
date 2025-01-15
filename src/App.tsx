import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import colors from './constants/colors';
import Splash from './screens/Splash';
import Home from './screens/home/index.tsx';
import Details from './screens/home/Details.tsx';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const options: {} = {
    headerShown: false,
    animation: 'default',
  };
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor={colors.dark} />
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen options={options} name="splash" component={Splash} />
        <Stack.Screen options={options} name="home" component={Home} />
        <Stack.Screen options={options} name="details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
