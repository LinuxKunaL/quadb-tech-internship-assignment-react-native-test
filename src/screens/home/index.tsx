import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';

import BottomNavigation from '../../components/others/BottomNavigation';
import colors from '../../constants/colors';
import Gap from '../../components/interface/Gap';
import sizes from '../../constants/sizes';
import TitleBar from '../../components/others/TitleBar';
import Search from './Search';
import spaces from '../../constants/spaces';

type Props = {};

const Tab = createBottomTabNavigator();

const Index: React.FC<Props> = props => {
  const tabData = [
    {
      route: 'home-tab',
      name: 'Home',
      component: Home,
      icon: 'home',
    },
    {
      route: 'search-tab',
      name: 'search',
      component: Search,
      icon: 'magnify',
    },
  ];

  return (
    <View style={styles.container}>
      <Gap height={sizes.xs} />
      <StatusBar translucent={false} backgroundColor={colors.dark} />
      <TitleBar />
      <View style={styles.navigationContainer}>
        <Tab.Navigator
          tabBar={BottomNavigation}
          screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarShowLabel: false,
          }}
          initialRouteName="home-tab">
          {tabData.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.route}
              component={tab.component}
            />
          ))}
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
  navigationContainer: {flex: 1, width: '100%', height: '100%'},
});
