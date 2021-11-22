import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
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
                <View style={styles.cardRow}>
                    <Icon 
                        name={ props.favorite ? "heart" : "heart-o" } // heart is the solid icon, heart-o is the outlined icon
                        type="font-awesome"
                        color="#f50"
                        raised  // adds box shadow to icon
                        reverse // reverses color scheme
                        onPress={() => props.favorite ? console.log("Already set as a favorite") : props.markFavorite()}
                    />
                    <Icon
                        name={"pencil"}
                        type="font-awesome"
                        color="#5637DD"
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                </View>
            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>
                    {item.text}
                </Text>
                <Rating 
                    style={{
                        alignItems: "flex-start",
                        paddingVertical: "5%"
                    }}
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                />
                <Text style={{fontSize: 12}}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
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
            showModal: false,
            rating: 5,
            author: "",
            text: ""
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId) {
        this.toggleModal();
        this.props.postComment(campsiteId, this.props.rating, this.state.author, this.state.text)
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: "",
            text: ""
        });
    }

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
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
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({rating: rating})}
                            style={{paddingVertical: 10}}
                        />
                        <Input
                            placeholder="Author"
                            leftIcon={{
                                type: "font-awesome",
                                name: "user-o"
                            }}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={author => {this.setState({author: author})}}
                            value={this.state.author}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{
                                type: "font-awesome",
                                name: "comment-o"
                            }}
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={text => {this.setState({text: text})}}
                            value={this.state.text}
                        />
                        <View>
                            <Button
                                title="Submit"
                                color="#5637DD"
                                onPress={() => {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {this.toggleModal()}}
                                color="#808080"
                                title="Cancel"
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    modal: {
        justifyContent: "center",
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);