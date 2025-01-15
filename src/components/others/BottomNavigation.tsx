import {Pressable, StyleSheet, Vibration, View, Text} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import globalStyles from '../../styles/style';

const BottomNavigation: React.FC<BottomTabBarProps> = props => {
  const routesName = props.state.routeNames;

  const activeTabIndex = props.state.index;

  const icons: any = {
    home: 'home',
    search: 'magnify',
  };

  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        {routesName.map((route, index) => (
          <Pressable
            key={index}
            style={[
              styles.tabView,
              {
                backgroundColor:
                  activeTabIndex === index
                    ? colors.primary
                    : colors.transparent,
              },
            ]}
            onPress={() => {
              props.navigation.navigate(route);
              Vibration.vibrate(100);
            }}>
            <Icon
              name={icons[route.split('-')[0]]}
              size={26}
              color={activeTabIndex === index ? colors.white : colors.white}
            />
            {activeTabIndex === index && (
              <Text style={styles.tabText}>{route.split('-')[0]}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barView: {
    backgroundColor: colors.gray,
    height: 64,
    padding: 10,
    gap: 10,
    borderTopColor: colors.gray,
    borderTopWidth: 0.7,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  tabView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    zIndex: 2,
    borderRadius: 100,
  },
  tabText: {
    fontFamily: fonts.RubikMedium,
    color: colors.white,
    textTransform: 'capitalize',
  },
});
