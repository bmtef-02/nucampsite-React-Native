import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Constants from 'expo-constants';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions,
    fetchPartners } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

// createStackNavigator is a function that requires one argument: the route configs object
const DirectoryNavigator = createStackNavigator(
    
    // route configs object holds the components that are available to the stack
    {
        Directory: { 
            screen: Directory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name="list"
                    type="font-awesome"
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
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
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                    name="home"
                    type="font-awesome"
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                    name="info-circle"
                    type="font-awesome"
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                    name="address-card"
                    type="font-awesome"
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='tree'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: "always", horizontal: "never"}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image 
                        source={require("./images/logo.png")}
                        style={styles.drawerImage} 
                    />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

// This is the top level stack navigator. 
// the createDrawerNavigator function needs a object with the screens that will  be in the drawer
const MainNavigator = createDrawerNavigator(
    
    // the screens that will be in the drawer
    // we want to put in the drawer the stack navigators for home and directory, not the home and directory components
    {
        Home: { 
            screen: HomeNavigator ,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="home"
                        type="font-awesome"
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Directory: { 
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="list"
                        type="font-awesome"
                        size={24}
                        color={tintColor}
                    />
                )
            } 
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: "About Us",
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="info-circle"
                        type="font-awesome"
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: "Contact Us",
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name="address-card"
                        type="font-awesome"
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },

    // optional argument to set the drawer background color
    {
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent
    }
);

// createAppContainer will return a React component that handles connecting the top level navigator to the React Native app
// usually wrap top level navigator in createAppContainer
const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 24
    }
})

export default connect(null, mapDispatchToProps)(Main);