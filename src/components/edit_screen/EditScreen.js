import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { saveWorkHandler, updateTimeHandler, nameChangeHandler, idGenerator, getIndex } from '../../store/database/asynchHandler'
import Controls from './Controls'
import Wireframe from './Wireframe'
import Properties from './Properties'

export const NEW_CONTROLS = {
    CONTAINER: {
        type: "container",
        style: {
            position: 'absolute', width: '150px', height: '80px', backgroundColor: 'white',
            borderColor: "#000000", borderRadius: "5px", borderStyle: 'solid', borderWidth: "1px",
            fontSize: "18px", left: '2px', color: '#000000', top: '2px' , zIndex: '-2',
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
        window.addEventListener("keyup", this.keyboard.bind(this));
    }

    componentWillUnmount = () => { 
        window.removeEventListener("keyup", this.keyboard.bind(this)); 
    }

    keyboard = (e) => {
        if(e.key.toLowerCase() === 'd') { e.preventDefault()}
        e.stopPropagation()
        var controls = JSON.parse(JSON.stringify(this.state.controls))
        var selected = this.state.selected
        var ekey = e.key.toLowerCase()
        const index = getIndex(controls, selected)
        if(index !== -1) {
            if(ekey === "delete") {
                controls.splice(index, 1)
                this.setState({ selected: '', controls: controls, changed: true })
            }
            else if (e.ctrlKey && ekey === 'd') {
                e.preventDefault()
                var control = JSON.parse(JSON.stringify(controls[index]))
                control.style.left = parseInt(control.style.left.substring(0, control.style.left.length)) + 60 + 'px'
                control.style.top = parseInt(control.style.top.substring(0, control.style.top.length)) + 60 + 'px'
                control.key = idGenerator()
                controls.push(control)
                this.setState({ selected: control.key, controls: controls, changed: true })
            }
        }
    }

    saveWork = (e) => {
        e.stopPropagation()
        if(this.state.name === "") {
            this.setState({name: "unknown"})
        }
        this.setState({changed: false})
        this.props.saveWork(this.props.wireframe, this.state.controls, (this.state.name === "") ? "unknown" : this.state.name)
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
        this.setState({selected: key })
    }
    unselect = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ selected: '' })
    }
    addControl = (type, e) => {
        e.preventDefault()
        let controls = this.state.controls
        let control = {}
        switch(type) {
            case "container":
                control = JSON.parse(JSON.stringify(NEW_CONTROLS.CONTAINER))
                break
            case "label":
                control = JSON.parse(JSON.stringify(NEW_CONTROLS.LABEL))
                break
            case "button":
                control = JSON.parse(JSON.stringify(NEW_CONTROLS.BUTTON))
                break
            default:
                control = JSON.parse(JSON.stringify(NEW_CONTROLS.TEXTFIELD))
                break
        }
        control.key = idGenerator()
        console.log(control.key)
        controls.push(control)
        this.setState({changed: true, selected: control.key, controls: controls}) 
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
    resize = (w, h, key, e) => {
        var controls = JSON.parse(JSON.stringify(this.state.controls))
        const i = getIndex(controls, key)
        controls[i].style.width = w
        controls[i].style.height = h
        this.setState({ controls: controls, changed: true });
    }
    
    drag = (x, y, key) => {
        var controls = JSON.parse(JSON.stringify(this.state.controls))
        const i = getIndex(controls, key)
        controls[i].style.top = y
        controls[i].style.left = x
        this.setState({ controls: controls, changed: true });
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
                    name={this.state.name}
                    resize={this.resize}
                    selected={this.state.selected}
                    drag={this.drag}/>
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
  