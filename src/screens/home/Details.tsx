import {Linking, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {api} from '../../app/api';
import TShowDetails from '../../types/showDetails';
import defaultProps from '../../types/props';
import LinearGradient from 'react-native-linear-gradient';

import {Image, ScrollView} from 'react-native';
import colors from '../../constants/colors';
import typographyStyles from '../../constants/typography';
import globalStyles from '../../styles/style';
import Button from '../../components/interface/Button';
import Gap from '../../components/interface/Gap';
import IconButton from '../../components/interface/IconButton';

type Props = defaultProps & {};

const Details: React.FC<Props> = props => {
  const [show, setShowData] = useState<TShowDetails>();

  useEffect(() => {
    api
      .get(`/shows/${props.route.params}`)
      .then(res => {
        setShowData(res.data);
      })
      .catch(err => console.error(err));
  }, [props.route.params]);

  const cleanSummary =
    show && show.summary ? show.summary.replace(/<[^>]*>/g, '') : '';

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.transparent} />
      <View style={styles.heroContainer}>
        <Image source={{uri: show?.image?.original}} style={styles.heroImage} />
        <LinearGradient
          colors={['transparent', colors.dark]}
          style={styles.gradient}
        />
      </View>
      <IconButton
        variant="tertiary"
        name="arrow-left"
        color={colors.white}
        size="md"
        iconSize={19}
        onPress={() => props.navigation.navigate('home')}
        style={styles.backBtn}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{show?.name}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.rating}>{show?.rating.average}/10</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.year}>{show?.premiered.split('-')[0]}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.runtime}>{show?.averageRuntime}m</Text>
        </View>

        <View style={styles.genreContainer}>
          {show?.genres.map((genre: any, index: any) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
        <Gap height={20} />
        <Button
          variant="primary"
          fontSize="md"
          size="lg"
          onPress={() => Linking.openURL(show?.officialSite)}>
          <Text style={styles.watchButtonText}> Watch Now</Text>
        </Button>
        <Gap height={20} />
        <Text style={styles.summaryTitle}>Overview</Text>
        <Gap height={5} />
        <Text style={styles.summary}>{cleanSummary}</Text>
        <Gap height={20} />
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Network: </Text>
            <Text style={styles.infoValue}>
              {show?.webChannel?.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status: </Text>
            <Text style={styles.infoValue}>{show?.status}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Language: </Text>
            <Text style={styles.infoValue}>{show?.language}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    position: 'relative',
  },
  heroContainer: {
    height: 450,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  content: {
    padding: 16,
    marginTop: -40,
  },
  title: {
    ...typographyStyles.h1,
    color: colors.white,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    color: colors.green,
    ...typographyStyles.title,
  },
  dot: {
    color: colors.gray300,
    marginHorizontal: 8,
  },
  year: {
    color: colors.white,
    ...typographyStyles.title,
  },
  runtime: {
    color: colors.white,
    ...typographyStyles.title,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: colors.gray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    ...globalStyles.border,
  },
  genreText: {
    color: colors.white,
    ...typographyStyles.subtitle,
  },
  watchButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  watchButtonText: {
    color: colors.white,
  },
  summaryTitle: {
    color: colors.white,
    ...typographyStyles.h2,
  },
  infoItem: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  summary: {
    lineHeight: 20,
    color: colors.gray300,
    ...typographyStyles.label,
  },
  additionalInfo: {
    gap: 3,
  },
  infoLabel: {
    color: colors.gray300,
    ...typographyStyles.subtitle,
  },
  infoValue: {
    color: colors.white,
    ...typographyStyles.label,
  },
});
