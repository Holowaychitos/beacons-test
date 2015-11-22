'use strict'

var React = require('react-native')
var {AppRegistry, StyleSheet, Text, View, DeviceEventEmitter} = React

var Beacons = require('react-native-ibeacon')

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
  identifier: 'kontatk',
  uuid: '05E9919B-70F4-4592-94BB-9150DA7B9033',
  major: 21737
}

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization()
Beacons.startMonitoringForRegion(region)
Beacons.startRangingBeaconsInRegion(region)
Beacons.startUpdatingLocation()

var ninio = React.createClass({

  getInitialState: function () {
    return {
      data: 'Run....'
    }
  },

  componentDidMount: function () {
    var subscription = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          data: data
        })
      }
    )
  },

  render: function () {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          hola mundo 2...
        </Text>
        <Text style={styles.welcome}>
          {this.state.data.minor}
        </Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('ninio', () => ninio)
