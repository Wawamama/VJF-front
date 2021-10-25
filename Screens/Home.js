import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TopBar from '../Components/TopBar'
import Diet from '../Components/Diet'
import Donts from '../Components/Donts'
import Allergies from '../Components/Allergies'
import NextButton from '../Components/NextButton'

import { connect } from 'react-redux';

const Home = props => {
    return (
        <View style={styles.container}>
            <TopBar />
            <View>
                <Diet />
                <Donts />
                <Allergies />
                <NextButton title="NEXT" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
})


function mapDispatchToProps(dispatch) {
    return {
        onClick: function (diet) {
            dispatch({ type: '', diet })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Home);