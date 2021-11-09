import React from 'react';

// These 2 components work well together - like <ul> and <li> in HTML
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {

    // Flatlist by default passes an object to this function

    // using {item} we can access the current item being iterated over
    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}

                // this prop requires an object - so have to use {{}}; outer {} is for JSX
                // source is a property that we use to give an image location
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
            />
        );
    };

    return (

        // Flatlist will iterate through every item in the array we gave to the data prop
        // the function in the renderItem prop will run on every single item
        <FlatList
            // data property expects an array; holds the campsites array
            data={props.campsites}

            // this prop will specify how to render each item in the class
            renderItem={renderDirectoryItem}

            // this prop holds the unique id for each item in the campsites array
            // similar to the key property in React
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;