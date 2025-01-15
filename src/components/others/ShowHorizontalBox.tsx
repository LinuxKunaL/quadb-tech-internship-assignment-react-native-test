import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import IconButton from '../interface/IconButton';
import TShowDetails from '../../types/showDetails';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const ShowHorizontalBox: React.FC<TShowDetails> = show => {
  const {navigate} = useNavigation<any>();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.movieItem}
      onPress={() => {
        navigate('details', show.id);
      }}>
      <View style={styles.movieDetails}>
        <View style={styles.movieImageWrapper}>
          <Image src={show.image?.medium} style={styles.movieImage} />
        </View>
        <View style={styles.movieInfo}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.movieTitle}>
            {show.name}
          </Text>
        </View>
      </View>
      <IconButton
        variant="secondary"
        iconSize={20}
        name="play"
        color={colors.primary}
        size="sm"
        onPress={() => {
          navigate('details', show.id);
        }}
        style={styles.playButton}
      />
    </TouchableOpacity>
  );
};

export default ShowHorizontalBox;

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  movieDetails: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  movieImageWrapper: {
    width: 120,
    height: 80,
    overflow: 'hidden',
    borderRadius: 8,
  },
  movieInfo: {
    overflow: 'hidden',
    width: '53%',
  },
  movieTitle: {
    ...typographyStyles.subtitle,
    color: colors.gray100,
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    borderRadius: 1000,
  },
});
