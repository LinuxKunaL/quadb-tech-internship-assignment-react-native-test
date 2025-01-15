import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../constants/colors';
import {api} from '../../app/api';
import globalStyles from '../../styles/style';
import TShowDetails from '../../types/showDetails';
import ShowBox from '../../components/others/ShowBox';
type Props = {};

const Home: React.FC<Props> = props => {
  const [moviesData, setMoviesData] = useState<TShowDetails[]>();

  useEffect(() => {
    api
      .get('/search/shows?q=iron%20man')
      .then(res => {
        const filteredData = res.data.map((item: {show: any}) => {
          return item.show;
        });
        setMoviesData(filteredData);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.showView}>
          <ScrollView>
            <View style={styles.showList}>
              {moviesData?.map(show => (
                <ShowBox key={show.id} {...show} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;

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
  showList: {
    gap: 15,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  showView: {
    height: '100%',
    width: '100%',
  },
});
