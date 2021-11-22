// import React, { Component } from 'react';
// import { FlatList, ScrollView, Text } from 'react-native';
// import { baseUrl } from '../shared/baseUrl';


// class NBA extends Component {
    
//     constructor(props) {
//         super(props);

//         this.state = {
//             teams: []
//         }
//     }

//     fetchTeams() {
//         fetch('https://www.balldontlie.io/api/v1/teams')
//         .then(response => response.json())
//         //same data just using different name -> response === data
//         .then(data => this.setState({teams: data.meta}))
//         console.log(this.state.teams)
//     }

//     render() {

//         this.fetchTeams()

//         return (
//             <ScrollView>
//                 <Text>Test</Text>
//             </ScrollView>
            
//         );
//     }
// }

// export default NBA;