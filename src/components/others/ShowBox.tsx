import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import Icon from '../interface/Icon';
import TShowDetails from '../../types/showDetails';
import globalStyles from '../../styles/style';
import spaces from '../../constants/spaces';
import colors from '../../constants/colors';
import typographyStyles from '../../constants/typography';
import {useNavigation} from '@react-navigation/native';

const ShowBox: React.FC<TShowDetails> = show => {
  const {navigate} = useNavigation<any>();

  return (
    <TouchableOpacity
      key={show.id}
      onPress={() => {
        navigate('details', show.id);
      }}
      activeOpacity={0.8}
      style={[styles.containerBox]}>
      <Image src={show.image?.medium} style={styles.backgroundImage} />
      <View style={styles.titleView}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {show.name}
        </Text>
      </View>
      {
        <View style={styles.ratingView}>
          <Icon name="star" color={colors.yellow} size={13} />
          <Text style={styles.ratingText}>
            {show.rating?.average ? show.rating.average : 'No'}
          </Text>
        </View>
      }
    </TouchableOpacity>
  );
};

export default ShowBox;

const styles = StyleSheet.create({
  containerBox: {
    width: 130,
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    height: 230,
    ...globalStyles.border,
  },
  backgroundImage: {
    objectFit: 'cover',
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },

  titleView: {
    position: 'absolute',
    bottom: 32,
    margin: 5,
    width: 100,
    height: 24,
    alignItems: 'center',
    borderRadius: spaces.radius / 1.6,
    justifyContent: 'center',
    backgroundColor: colors.gray,
    paddingLeft: 1,
    paddingRight: 1,
  },
  titleText: {
    ...typographyStyles.text,
    color: colors.white,
  },
  ratingView: {
    gap: 2,
    bottom: 0,
    margin: 5,
    width: 50,
    height: 26,
    position: 'absolute',
    borderRadius: spaces.radius / 1.6,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '600',
    includeFontPadding: false,
    color: colors.white,
  },
});
