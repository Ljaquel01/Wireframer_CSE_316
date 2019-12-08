import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { saveWorkHandler, updateTimeHandler, nameChangeHandler, idGenerator } from '../../store/database/asynchHandler'
import Controls from './Controls'
import Wireframe from './Wireframe'
import Properties from './Properties'

export const NEW_CONTROLS = {
    CONTAINER: {
        type: "container",
        style: {
            position: 'absolute', width: '150px', height: '80px', backgroundColor: 'white',
            borderColor: "#000000", borderRadius: "5px", borderStyle: 'solid', borderWidth: "1px",
            fontSize: "18px", left: '2px', color: '#000000', top: '2px',
        }
    },
    BUTTON: {
        type: "button",
        text: "button",
        style: {
            width: '80px', height: '25px', backgroundColor: '#FFFFFF', borderColor: "#000000",
            borderRadius: "5px", borderStyle: 'solid', borderWidth: "1px", fontSize: "18px",
            position: 'absolute', left: '2px', color: '#000000', top: '2px'
        }
    },
    TEXTFIELD: {
        type: "textfield",
        text: "textfield",
        style: {
            position: "abosulte", width: '100px', height: '40px', backgroundColor: '#FFFFFF',
            borderRadius: "6px", borderStyle: 'solid', borderWidth: "1px",
            fontSize: "18px", left: '2px', color: '#000000', top: '2px',
        }
    },
    LABEL: {
        type: "label",
        text: "label",
        style: {
            position: "absolute", width: '80px', height: '50px', backgroundColor: '#FFFFFF', 
            borderColor: "#000000", borderRadius: "6px", borderStyle: 'solid', borderWidth: "0px", 
            fontSize: "18px", left: '2px', color: '#000000', top: '2px',
        }
    }
  }

class EditScreen extends Component {
    state = {
        name: this.props.wireframe ? this.props.wireframe.name : "unknown",
        controls: this.props.wireframe ? this.props.wireframe.controls : [],
        selected: '',
        zoom: 1,
        changed: false
    }

    componentDidMount() {
        if(this.props.wireframe) { this.props.updateTime(this.props.wireframe) }
    }

    saveWork = (e) => {
        e.stopPropagation()
        if(this.state.name === "") {
            this.setState({name: "unknown"})
        }
        this.setState({changed: false})
        this.props.saveWork(this.props.wireframe, this.state.controls, this.state.name)
    }
    closeWork = (e) => {
        e.stopPropagation()
        this.props.history.push('/')
    }
    nameChange = (e) => {
        var name = e.target.value
        this.setState({changed: true, name: name})
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
    addControl = (type, e) => {
        e.preventDefault()
        var controls = this.state.controls
        var control = NEW_CONTROLS.CONTAINER
        switch(type) {
            case "container":
                control = NEW_CONTROLS.CONTAINER
                break
            case "label":
                control = NEW_CONTROLS.LABEL
                break
            case "button":
                control = NEW_CONTROLS.BUTTON
                break
            default:
                control = NEW_CONTROLS.TEXTFIELD
                break
        }
        control.key = idGenerator()
        controls.push(control)
        this.setState({changed: true, controls: controls})
    }
    changeControl = (index, e) => {
        const { name } = e.target
        var value = e.target.value
        if(value === '') { value = " "}
        var temp = this.state.controls
        var tempStyle = JSON.parse(JSON.stringify(temp[index].style))
        if(name === 'text') { temp[index].text ? (temp[index].text = value) : (temp[index].value = value) }
        if(name === 'color') { tempStyle.color = value; temp[index].style = tempStyle}
        if(name === 'fontSize') { tempStyle.fontSize = value + 'px'; temp[index].style = tempStyle}
        if(name === 'backgroundColor') { tempStyle.backgroundColor = value; temp[index].style = tempStyle}
        if(name === 'borderColor') { tempStyle.borderColor = value; temp[index].style = tempStyle}
        if(name === 'borderWidth') { tempStyle.borderWidth = value + 'px'; temp[index].style = tempStyle}
        if(name === 'borderRadius') { tempStyle.borderRadius = value + 'px'; temp[index].style = tempStyle}
        this.setState({controls: temp, changed: true})
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
                    any={this.state.changed}
                />
                <Wireframe controls={this.state.controls} 
                    selectControl={this.selectControl}
                    unselect={this.unselect}
                    nameChange={this.nameChange}
                    name={this.state.name}/>
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
    saveWork: (wireframe, controls, name) => dispatch(saveWorkHandler(wireframe, controls, name)),
    updateTime: (wireframe) => dispatch(updateTimeHandler(wireframe)),  
    nameChange: (wireframe, name) => dispatch(nameChangeHandler(wireframe, name))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(EditScreen);
  