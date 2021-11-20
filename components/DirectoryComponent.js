import React, { Component } from 'react';

// These 2 components work well together - like <ul> and <li> in HTML
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
    };
};

class Directory extends Component {

    // configure the text of the header using static keyword
    static navigationOptions = {
        title: "Directory"
    };

    render() {

        // each screen component, like Directory, has the navigation prop automatically
        // this prop has useful functions like navigate, which goes to another screen
        // we use the navigate function to route to a campsite when a user clicks on the campsite
        // we destructure the navigate function out of the navigation prop
        const { navigate } = this.props.navigation;

        // Flatlist by default passes an object to this function
        // using {item} we can access the current item being iterated over
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured

                    // this prop will fire the function when the <ListItem> component is pressed
                    // the function that fires is the navigate function, which will route to the CampsiteInfo screen
                    // campsiteId is a parameter that holds the id of the campsite that we click on
                    onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}

                    // this prop requires an object - so have to use {{}}; outer {} is for JSX
                    // source is a property that we use to give an image location
                    imageSrc={{uri: baseUrl + item.image}}                
                />
            );
        };

        return (

            // Flatlist will iterate through every item in the array we gave to the data prop
            // the function in the renderItem prop will run on every single item
            <FlatList
                // data property expects an array; holds the campsites array
                data={this.props.campsites.campsites}

                // this prop will specify how to render each item in the class
                renderItem={renderDirectoryItem}

                // this prop holds the unique id for each item in the campsites array
                // similar to the key property in React
                keyExtractor={item => item.id.toString()}
            />
        );
    }
    
}

export default connect(mapStateToProps)(Directory);