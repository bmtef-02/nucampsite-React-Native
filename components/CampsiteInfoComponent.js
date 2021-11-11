import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

function RenderCampsite({campsite}) {
    
    // makes sure that the campsite object is not null 
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}
            >
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }
    
    // sets the title of the header
    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        // in Main, we set CampsiteInfo as a screen component, which automatically has navigation prop
        // campsiteId will receive the id of the campsite that was clicked on and that will be passed to <RenderCampsite> using getParam
        // getParam is a function of this.props.navigation, just like the navigate function used in DirectoryComponent
        const campsiteId = this.props.navigation.getParam("campsiteId");

        // filter through the campsite array in state to get the campsite we clicked on via campsiteId
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];

        // pass the campsite in the line above to RenderCampsite
        return <RenderCampsite campsite={campsite} />;
    }
    
}

export default CampsiteInfo;