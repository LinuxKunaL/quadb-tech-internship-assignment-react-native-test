import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import defaultProps from '../types/props';
import globalStyles from '../styles/style';
import colors from '../constants/colors';
import typographyStyles from '../constants/typography';
import Icon from '../components/interface/Icon';
import Gap from '../components/interface/Gap';

type Props = defaultProps & {};

const Splash: React.FC<Props> = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('home');
    }, 2000);
  }, [props.navigation]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.layout}>
        <Icon name="movie-roll" color={colors.primary} size={50} />
        <Gap height={10} />
        <Text style={[typographyStyles.h1, {color: colors.white}]}>
          Movie App
        </Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutLogo: {
    position: 'relative',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  animatedTextView: {flexDirection: 'row'},
  animatedWebPatten: {
    position: 'absolute',
    zIndex: 1,
  },
});
