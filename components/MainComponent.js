import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
        };
    }

    // an event handler that updates the selectedCampsite property whenever a campsite is selected
    onCampsiteSelect(campsiteId) {
        // this updates the state - the property selectedCampsite
        this.setState({selectedCampsite: campsiteId});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory 
                    campsites={this.state.campsites} 

                    // this prop passes the this.onCampsiteSelect method to <Directory> where it can be used there
                    // this does not call the this.onCampsiteSelect method
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                />
                <CampsiteInfo
                    // this prop passes a campsite object with a name, image, description, etc
                    // when you click on a campsite, the campsite ID gets stored in selectedCampsite in state
                    // the prop filters through the campsite array for the campsite that has the same ID as the one you clicked on
                    // the filter will return the array that contains the campsite you clicked on
                    // the [0] selected the first (and only) object in the array, which is the same campsite you clicked on
                    campsite={this.state.campsites.filter(
                        campsite => campsite.id === this.state.selectedCampsite)[0]}
                />
            </View>
        );
    }
}

export default Main;