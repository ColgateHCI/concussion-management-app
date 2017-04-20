import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  cAccent1,
  gAccent1,
} from '../../assets/styles.js';
import {
  Header3,
  Bold,
  BlockText,
} from '../../components/TextComponents';
import ColoredButton from '../../components/ColoredButton';
import SliderText from '../../components/SliderText';
import SymDescription from '../../components/SymDescription';
import Slider from 'react-native-slider';

export default class Headache extends React.Component {

  state = {
    rating: 0,
  }

  render() {

    var symColor = cAccent1;

    return (
      <View>
        
        <View style={{ justifyContent: 'center',
                       alignItems: 'center',
                       paddingHorizontal: 10,
                       height: 110,
                       backgroundColor: symColor}}>
          <Text style={styles.symptomTitle}>Headache</Text>
        </View>

        <SymDescription
          rating={this.state.rating}
          symColor = {symColor}
          sym ="headache"
          d1="You have a slight or occasional headache, but your normal activities are not impaired."
          d2="You still can carry on normal activities but may face more difficulty than usual because of your headache."
          d3="Your headache is distracting and you may need to stop or avoid certain activities to not exacerbate it."
          d4="Your activities are limited due to your consistent headache and you may struggle to concentrate."
          d5="You have frequent and consistent headaches that require lots of resting, and little to no activity. You may have difficulty concentrating or thinking."
          d6="You have a headache constantly, are unable to complete any normal activities, and have difficulty speaking, thinking, and concentrating."/>

        <View style={{marginHorizontal: 25}}>
          <SliderText rating={this.state.rating} color={symColor}/>

          <Slider
                value={this.state.rating}
                onValueChange={(rating) => this.setState({rating})} 
                minimumValue={0}
                maximumValue={6}
                step={1}
                thumbStyle={{width: 20, backgroundColor: symColor, top: 22}}
                trackStyle={styles.trackStyle}
                minimumTrackTintColor={symColor}
                />
        </View>

        <ColoredButton style={{backgroundColor: symColor, marginBottom: 20, marginTop: 5,}} onClick={this.props.increaseSymNum()}>
        <Text style={{fontSize: 20}}>Submit</Text>
        </ColoredButton>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 10,
    paddingBottom: 10,
  },
  symptomTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  trackStyle: {
    backgroundColor: gAccent1,
  }
});

//Headache = connect(store => ({symNum: store.symNum}))(Headache);
Headache = connect(
                        null, 
                        dispatch => ({increaseSymNum: () => {dispatch({section: 'symNum', type: 'CHANGE_STAGE', state: this.props.symNum+1})}})
                        )(Headache); // Increase sym num