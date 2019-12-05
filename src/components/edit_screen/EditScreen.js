import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { saveWorkHandler, updateTimeHandler, addControlHandler } from '../../store/database/asynchHandler'
import Controls from './Controls'
import Wireframe from './Wireframe'
import Properties from './Properties'

export const NEW_CONTROLS = {
    CONTAINER: {
        type: "container", text: "",
        style: {
            position: 'relative', width: '150px', height: '80px', backgroundColor: 'white',
            borderColor: "#000000", borderRadius: "5px", borderStyle: 'solid', borderWidth: "1px",
            fontSize: "18px", left: '0px', color: '#000000', top: '0px',
        }
    }
  }

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
    selectControl = (key, e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ selected: key})
    }
    unselect = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ selected: ''})
    }
    addControl = (e) => {
        e.preventDefault()
        switch("") {
            case "container":
                this.props.addControl(this.props.wireframe, NEW_CONTROLS.CONTAINER)
                break
            default:
                break
        }
    }
    changeControl = (index, e) => {
        const {name, value } = e.target
        console.log(value)
        var temp = this.state.controls
        var tempStyle = JSON.parse(JSON.stringify(temp[index].style))
        if(name === 'text') { temp[index].text ? (temp[index].text = value) : (temp[index].value = value) }
        if(name === 'backgroundColor') { tempStyle.backgroundColor = value; temp[index].style = tempStyle}
        this.setState({controls: temp})
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
                <Wireframe controls={this.state.controls} 
                    selectControl={this.selectControl}
                    unselect={this.unselect}/>
                <Properties wireframe={wireframe} 
                    controls={this.state.controls} 
                    selected={this.state.selected}
                    change={this.changeControl}/>
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
  