import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments
    };
};

function RenderCampsite(props) {
    
    const {campsite} = props;   // object destructuring; same as campsite = props.campsite

    // makes sure that the campsite object is not null 
    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}
            >
                <Text style={{margin: 10}}>
                    {campsite.description} 
                </Text>
                <Icon 
                    name={ props.favorite ? "heart" : "heart-o" } // heart is the solid icon, heart-o is the outlined icon
                    type="font-awesome"
                    color="#f50"
                    raised  // adds box shadow to icon
                    reverse // reverses color scheme
                    onPress={() => props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class CampsiteInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        };
    }
    
    markFavorite() {
        this.setState({favorite: !this.state.favorite});
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
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];

        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        
        // pass the campsite in the line above to RenderCampsite
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
    
}

export default connect(mapStateToProps)(CampsiteInfo);