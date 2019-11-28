import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { saveWorkHandler } from '../../store/database/asynchHandler'
import Controls from './Controls'
import Wireframe from './Wireframe'
import Properties from './Properties'

class EditScreen extends Component {
    state = {
        name: '',
        controls: [],
        selected: '',
        zoom: ''
    }

    saveWork = (e) => {
        e.stopPropagation()
        //this.props.saveWork(???????)
        this.props.history.push('/')
    }
    closeWork = (e) => {
        e.stopPropagation()
        this.props.history.push('/')
    }
    zoom = (e) => {

    }
    addControl = (e) => {
        
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid || !wireframe) {
            return <Redirect to="/" />;
        }

        return (
            <div id="edit_screen" className="white row">
                <Controls
                    saveWork={this.saveWork}
                    closeWork={this.closeWork}
                    zoom={this.zoom}
                    addControl={this.addControl}
                />
                <Wireframe wireframe={wireframe}/>
                <Properties wireframe={wireframe}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
  if(!wireframes) {
    return {
        wireframe: null,
        auth: state.firebase.auth
    }
  }
  wireframe.id = id;
  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => ({
    saveWork: (wireframe) => dispatch(saveWorkHandler(wireframe))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(EditScreen);
  