import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { 
  Bold, 
  Header1, 
  Header2, 
  Header3 
} from '../components/TextComponents';
import VerticalProgressBar from '../components/VerticalProgressBar';
import HorizontalProgressBar from '../components/HorizontalProgressBar';
import Tooltip from '../components/Tooltip';
import PBWaiver from '../components/PBWaiver';
import PBVideo from '../components/PBVideo';
import PBEducation from '../components/PBEducation';
import PBBaseline from '../components/PBBaseline';
import ColoredButton from '../components/ColoredButton';

export default class PSHome extends React.Component {
  // state = {
  //   //modalVisible: true,
  //   progress: 1,
  // }
  
  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  // }

  static navigationOptions = {
    title: 'Pre-Season Home',
  };

  render() {
    const { navigate } = this.props.navigation;

    var content = (<Text>Invalid state</Text>);

    switch(this.props.psStage) {
      case 1:
        content = (<PBVideo navigation={this.props.navigation}/>);
        break;
      case 2: 
        content = (<PBEducation navigation={this.props.navigation}/>);
        break;
      case 3: 
        content = (<PBWaiver navigation={this.props.navigation}/>);
        break;
      case 4:
        content = (<PBBaseline navigation={this.props.navigation}/>);
        break;
    }

    if (this.props.edStage > 4) {
      this.props.markEdDone();
    }

    return (
      <ScrollView style={styles.container}>
        {/* TO DO: This should only pop up on the first visit*/}
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.props.firstPSVisit}
          >
          <View style={styles.popup}>
            <Header2>
            Welcome to your pre-season home!
            </Header2> 
            <Text style={{fontSize: 18}}>Your athletic administrator has asked you to complete the
            following tasks before you start your season.</Text>
            <VerticalProgressBar/>
            <Text style={{fontSize: 18}}>Your deadline to complete these tasks is <Bold style={{fontSize: 18}}>Deadline</Bold>.</Text>
            <ColoredButton
              onPress={() => {this.props.markFirstVisit()}}>
              Okay
            </ColoredButton>
          </View>
        </Modal>

        <Image
            source={require('../assets/brain.png')}
            style={styles.logoContainer}
        />
        <Header1 style={{marginLeft: 20, marginBottom: 5,}}>
        Welcome, Bria!
        </Header1>

        <HorizontalProgressBar progress={this.props.psStage}>
        {content}
        </HorizontalProgressBar>


        {/*}
        {(this.props.progress < 5) && 
          <Header2>You're all done!</Header2>
          <Text>Great job, you're now ready to begin your season. Click below to navigate to your in-season home screen</Text>
          <ColoredButton></ColoredButton>}*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    width: 55,
    height: 55,
    margin: 10,
    alignSelf: 'center',
  },
  popup: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 10,
    marginTop: 70,
    padding: 10,
    justifyContent: 'space-between',
  },
});

// Handle progress state changes
PSHome = connect(store => ({psStage: store.psStage}))(PSHome);
PSHome = connect(store => ({edStage: store.edStage}))(PSHome);
PSHome = connect(
                        null, 
                        dispatch => ({markEdDone: () => {dispatch({section: 'psStage', type: 'CHANGE_STAGE', state: 3})}})
                        )(PSHome);


// Handle first visit
PSHome = connect(
                        null, 
                        dispatch => ({markFirstVisit: () => {dispatch({section: 'firstPSVisit', type: 'MARK_COMPLETE', state: false})}})
                        )(PSHome);
PSHome = connect(store => ({firstPSVisit: store.firstPSVisit}))(PSHome);
