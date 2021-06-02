import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import PostIcon from "react-native-vector-icons/FontAwesome5"
import PersonIcon from "react-native-vector-icons/Ionicons"
import AddIcon from "react-native-vector-icons/AntDesign"
import SearchIcon from "react-native-vector-icons/FontAwesome"
import SettingsIcon from "react-native-vector-icons/Fontisto"
import BlogPosts from "./Components/BlogPosts"
import Search from "./Components/Search"
import AddPost from "./Components/AddPost"
import Settings from "./Components/Settings"
import Profile from "./Components/Profile"
import Hello from "./Components/Hello"
import AddPostTitle from "./Components/AddPostTitle"
import Preview from "./Components/Preview"
import IndividualPost from "./Components/IndividualPost"
import Hashtags from "./Components/Hashtags"
import BlogComponent from "./Components/BlogComponent"
import Likes from "./Components/Likes"
import Comments from "./Components/Comments"
import ChangeCredentials from "./Components/ChangeCredentials"
import PersonalBlogs from "./Components/PersonalBlogs"
import BookmarkedBlogs from "./Components/BookmarkedBlogs"
import OtherProfile from "./Components/OtherProfile"
import Drafts from "./Components/Drafts"
import AddHashtags from "./Components/AddHashtags"
import SearchedCategory from "./Components/SearchedCategory"
import SearchProfile from "./Components/SearchProfile"
import FollowersFollowing from "./Components/FollowersFollowing"
import Message from "./Components/Message"
import MessageList from "./Components/MessageList"

const Stack = createStackNavigator();

const { Navigator, Screen } = createBottomTabNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 30,
    mass: 4,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const BlogPostIcon = () => {
    return(
        <PostIcon name="blog" color='#8F9BB3' size={20} />
    )
}

const ProfileIcon = () => {
    return(
        <PersonIcon name="person" color='#8F9BB3' size={20} />
    )
}

const AddPostIcon = () => {
    return(
        <AddIcon name="plussquareo" color='#8F9BB3' size={35} />
    )
}

const SearchPostIcon = () => {
    return(
        <SearchIcon name="search" color='#8F9BB3' size={20} />
    )
}

const SettingsPostIcon = () => {
    return(
        <SettingsIcon name="player-settings" color='#8F9BB3' size={20} />
    )
}

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={BlogPostIcon}/>
      <BottomNavigationTab icon={SearchPostIcon}/>
      <BottomNavigationTab icon={AddPostIcon}/>
      <BottomNavigationTab icon={SettingsPostIcon}/>
      <BottomNavigationTab icon={ProfileIcon}/>
    </BottomNavigation>
  );

const StackNavigator = () => {

    return(
        <Stack.Navigator
            screenOptions={({route}) => ({
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: config,
                    close: config
                },
            })}
        >
            <Stack.Screen name='BlogPosts' component={BlogPosts} options={{headerShown: false}} />
            <Stack.Screen name='IndividualPost' component={IndividualPost} options={{headerShown: false}} />
            <Stack.Screen name='BlogComponent' component={BlogComponent} options={{headerShown: false}} />
            <Stack.Screen name='Likes' component={Likes} options={{headerShown: false}} />
            <Stack.Screen name='Comments' component={Comments} options={{headerShown: false}} />
            <Stack.Screen name='OtherProfile' component={OtherProfile} options={{headerShown: false}} />
            <Stack.Screen name='Message' component={Message} options={{headerShown: false}} />
            <Stack.Screen name='MessageList' component={MessageList} options={{headerShown: false}} />
            <Stack.Screen name='FollowersFollowing' component={FollowersFollowing} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}
  
const AddPostStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: config,
                    close: config
                } 
            }}
        >
            <Stack.Screen name='AddPostTitle' component={AddPostTitle} options={{headerShown: false}} />
            <Stack.Screen name='AddPost' component={AddPost} options={{headerShown: false}} />
            <Stack.Screen name='Hello' component={Hello} options={{headerShown: false}} />
            <Stack.Screen name='Hashtags' component={Hashtags} options={{headerShown: false}} />
            <Stack.Screen name='Preview' component={Preview} options={{headerShown: false}} />
            <Stack.Screen name='AddHashtags' component={AddHashtags} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const SettingsStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: config,
                    close: config
                } 
            }}
        >
            <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}} />
            <Stack.Screen name='ChangeCredentials' component={ChangeCredentials} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: config,
                    close: config
                } 
            }}
        >
            <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} />
            <Stack.Screen name='PersonalBlogs' component={PersonalBlogs} options={{headerShown: false}} />
            <Stack.Screen name='BookmarkedBlogs' component={BookmarkedBlogs} options={{headerShown: false}} />
            <Stack.Screen name='IndividualPost' component={IndividualPost} options={{headerShown: false}} />
            <Stack.Screen name='BlogComponent' component={BlogComponent} options={{headerShown: false}} />
            <Stack.Screen name='Likes' component={Likes} options={{headerShown: false}} />
            <Stack.Screen name='Comments' component={Comments} options={{headerShown: false}} />
            <Stack.Screen name='Drafts' component={Drafts} options={{headerShown: false}} />
            <Stack.Screen name='AddPostTitle' component={AddPostTitle} options={{headerShown: false}} />
            <Stack.Screen name='AddPost' component={AddPost} options={{headerShown: false}} />
            <Stack.Screen name='Hello' component={Hello} options={{headerShown: false}} />
            <Stack.Screen name='Hashtags' component={Hashtags} options={{headerShown: false}} />
            <Stack.Screen name='Preview' component={Preview} options={{headerShown: false}} />
            <Stack.Screen name='AddHashtags' component={AddHashtags} options={{headerShown: false}} />
            <Stack.Screen name='FollowersFollowing' component={FollowersFollowing} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const SearchStackNavigator = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: config,
                    close: config
                } 
            }}
        >
            <Stack.Screen name='Search' component={Search} options={{headerShown: false}} />
            <Stack.Screen name='SearchedCategory' component={SearchedCategory} options={{headerShown: false}} />
            <Stack.Screen name='IndividualPost' component={IndividualPost} options={{headerShown: false}} />
            <Stack.Screen name='BlogComponent' component={BlogComponent} options={{headerShown: false}} />
            <Stack.Screen name='Likes' component={Likes} options={{headerShown: false}} />
            <Stack.Screen name='Comments' component={Comments} options={{headerShown: false}} />
            <Stack.Screen name='OtherProfile' component={OtherProfile} options={{headerShown: false}} />
            <Stack.Screen name='Message' component={Message} options={{headerShown: false}} />
            <Stack.Screen name='SearchProfile' component={SearchProfile} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {

    return(
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='BlogPost' component={StackNavigator}/>
            <Screen name='Search' component={SearchStackNavigator}/>
            <Screen name='AddPost' component={AddPostStackNavigator}/>
            <Screen name='Settings' component={SettingsStackNavigator}/>
            <Screen name='Profile' component={ProfileStackNavigator}/>
        </Navigator>
    );
}

const AuthRouter = () => {
    return(
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    )
}

export default AuthRouter