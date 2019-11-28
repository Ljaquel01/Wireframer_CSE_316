import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { saveWorkHandler, updateTimeHandler, addControlHandler } from '../../store/database/asynchHandler'
import Controls from './Controls'
import Wireframe from './Wireframe'
import Properties from './Properties'

class EditScreen extends Component {
    state = {
        name: this.props.wireframe ? this.props.wireframe.name : "",
        controls: this.props.wireframe ? this.props.wireframe.controls : [],
        selected: '',
        zoom: 1
    }

    componentDidMount() {
        if(this.props.wireframe) { this.props.updateTime(this.props.wireframe) }
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
        e.preventDefault()
        switch("") {
            case "container":
                var control = {
                    type: "container",
                    text: "",
                    style: {
                        width: '150px',
                        height: '80px',
                        backgroundColor: 'white',
                        borderColor: "#000000",
                        borderRadius: "5px",
                        borderStyle: 'solid',
                        borderWidth: "1px",
                        fontSize: "15px",
                        left: '0px',
                        color: '#000000',
                        top: '0px',
                        zIndex: "-1"
                    }
                }
                this.props.addControl(this.props.wireframe, control)
                return
            default:
                return
        }
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
    saveWork: (wireframe) => dispatch(saveWorkHandler(wireframe)),
    updateTime: (wireframe) => dispatch(updateTimeHandler(wireframe)),
    addControl: (wireframe, control) => dispatch(addControlHandler(wireframe, control))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(EditScreen);
  