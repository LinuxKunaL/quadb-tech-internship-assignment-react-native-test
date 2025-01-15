import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import globalStyles from '../../styles/style';
import Input from '../../components/interface/Input';
import IconButton from '../../components/interface/IconButton';
import {api} from '../../app/api';
import TShowDetails from '../../types/showDetails';
import {Alert} from 'react-native';
import Gap from '../../components/interface/Gap';
import typographyStyles from '../../constants/typography';
import Icon from '../../components/interface/Icon';
import ShowHorizontalBox from '../../components/others/ShowHorizontalBox';

type Props = {};

const Search: React.FC<Props> = props => {
  const [moviesData, setMoviesData] = useState<TShowDetails[]>([]);
  const [search, setSearch] = useState<string>();

  const handleSearch = () => {
    if (!search) {
      return Alert.alert('Please enter a search term');
    }
    Keyboard.dismiss();
    api
      .get(`/search/shows?q=${search}`)
      .then(res => {
        const filteredData = res.data.map((item: {show: any}) => {
          return item.show;
        });
        setMoviesData(filteredData);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.searchView}>
          <View style={styles.flex1}>
            <Input placeholder="Search" onChangeText={setSearch} />
          </View>
          <IconButton
            variant="tertiary"
            iconSize={24}
            name="magnify"
            color={colors.white}
            size="lg"
            onPress={handleSearch}
          />
        </View>
        <Gap height={10} />
        {moviesData?.length === 0 && (
          <View style={styles.notFound}>
            <Icon name="movie-off" color={colors.primary} size={24} />
            <Text style={[typographyStyles.label, {color: colors.white}]}>
              No results found
            </Text>
          </View>
        )}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.moviesList}>
            {moviesData?.map(show => (
              <ShowHorizontalBox key={show.id} {...show} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingBottom: 5,
    ...globalStyles.layoutPadding,
  },
  searchView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  moviesList: {
    width: '100%',
    gap: 16,
  },
  notFound: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
