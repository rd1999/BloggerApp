import React from "react"
import { Layout, Text } from '@ui-kitten/components';
import { Dimensions, ScrollView, View} from "react-native"
import SearchIcon from "react-native-vector-icons/AntDesign"
import CategoriesRow from "./CategoriesRow"

const Search = ({navigation}) => {

  const width = Dimensions.get('window').width;

  return (
    <Layout style={{ flex: 1 }}>
      <View style={{flexDirection: 'row'}}>
        <Text category='h1' style={{marginTop: 20, marginLeft: 20, marginBottom: 10, flex: 1}}>Categories</Text>
        <SearchIcon onPress={() => navigation.navigate('SearchProfile')} name="search1" color="#8F9BB3" style={{alignSelf: 'center', marginTop: 20, marginRight: 20}} size={30} />
      </View>
      <ScrollView style={{marginBottom: 20}}>

        <CategoriesRow 
          uri1='../images/food.jpg'
          uri2='../images/fashion.jpg'
          text1='Food'
          text2='Fashion'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Lifestyle'
          text2='Political'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='SEO'
          text2='Music'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Blogging'
          text2='Gaming'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Fitness'
          text2='Finance'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Photography'
          text2='Parenting'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Sports'
          text2='Design'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Travel'
          text2='Movie'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='Cars'
          text2='DIY'
          navigation={navigation}
        />

        <CategoriesRow 
          uri1='../images/fashion.jpg'
          uri2='../images/fashion.jpg'
          text1='News'
          text2='Business'
          navigation={navigation}
        />

        {/* <CategoriesRow 
          uri1='https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/article/2020/04/22/coronavirus-and-obesity-doctors-take-aim-at-food-industry-over-poor-diets/10933380-3-eng-GB/Coronavirus-and-obesity-Doctors-take-aim-at-food-industry-over-poor-diets_wrbm_large.jpg'
          uri2='https://www.lsretail.com/hubfs/BLOG_6-technology-trends-reshaping-luxury-fashion-industry.jpg'
          text1='Food'
          text2='Fashion'
        /> */}

      </ScrollView>
    </Layout>
  );
}

export default Search

// other
// news
// business