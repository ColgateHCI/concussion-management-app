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

export default class SHome extends React.Component {
  state = {
    modalVisible: true,
    progress: 4,
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: 'Pre-Season Home',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        {/* TO DO: This should only pop up on the first visit*/}
        {/*}
        <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}
          >
          <View style={styles.popup}>
            <Header3>
            Welcome to your pre-season home!
            </Header3> 
            <Text>Your athletic administrator has asked you to complete the
            following tasks before you start your season.</Text>
            <VerticalProgressBar/>
            <Text>Your deadline to complete these tasks is <Bold>Deadline</Bold>.</Text>
            <ColoredButton
              onPress={() => {this.setModalVisible(false)}}>
              Okay
            </ColoredButton>
          </View>
        </Modal>
      */}

        <Image
            source={require('../assets/brain.png')}
            style={styles.logoContainer}
        />
        <Header1 style={{marginLeft: 20, marginBottom: 5,}}>
        Welcome, Bria!
        </Header1>

        <ColoredButton onPress={() => { navigate('SymptomTest'); this.props.startSymNum(); }}>
        Begin Test
        </ColoredButton>

        <ColoredButton onPress={() => navigate('ConcussionPolicy')}>
        CP
        </ColoredButton>

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

SHome = connect(
                        null, 
                        dispatch => ({startSymNum: () => {dispatch({section: 'symNum', type: 'CHANGE_STAGE', state: 0})}})
                        )(SHome); // Start sym test