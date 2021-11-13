import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

// createStackNavigator is a function that requires one argument: the route configs object
const DirectoryNavigator = createStackNavigator(
    
    // route configs object holds the components that are available to the stack
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },

    // optional arguments
    {
        // default component that shows first when navigator is open
        initialRouteName: "Directory",

        // here we configure settings/styles for the header
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#5637DD"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

// creating a stack navigator for the home component
const HomeNavigator = createStackNavigator(
    
    // route configs object holds the components that are available to the stack
    // since there is only 1 screen, we don't need initialRouteName 
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

// This is the top level stack navigator. 
// the createDrawerNavigator function needs a object with the screens that will  be in the drawer
const MainNavigator = createDrawerNavigator(
    
    // the screens that will be in the drawer
    // we want to put in the drawer the stack navigators for home and directory, not the home and directory components
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator }
    },

    // optional argument to set the drawer background color
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

// createAppContainer will return a React component that handles connecting the top level navigator to the React Native app
// usually wrap top level navigator in createAppContainer
const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

    render() {
        return (
            <View 
                style={{
                    flex: 1,

                    // this retrieves the paddingTop for either Android or iOS
                    // a ternary operator to check if platform is iOS or Android
                    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight
                }}
            >
                
                {/* This is a container that holds the DirectoryNavigator, which hold the screens for both Directory and Campsite components */}
                <AppNavigator />
            </View>
        );
    }
}

export default Main;