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
            fontSize: "18px", left: '2px', color: '#000000', top: '2px'
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
        value: "textfield",
        style: {
            position: 'abosulte', width: '100px', height: '40px', backgroundColor: '#FFFFFF',
            borderRadius: "6px", borderStyle: 'solid', borderWidth: "1px",
            fontSize: "18px", left: '2px', color: '#000000', top: '2px', cursor: 'default'
        }
    },
    LABEL: {
        type: "label",
        text: "label",
        style: {
            position: "absolute", width: '80px', height: '50px', backgroundColor: 'rgba(52, 52, 52, 0)', 
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
        changed: false,
        width: this.props.wireframe ? this.props.wireframe.width : '600px',
        height: this.props.wireframe ? this.props.wireframe.height : '400px',
    }

    componentDidMount() {
        if(this.props.wireframe) { this.props.updateTime(this.props.wireframe) }
        window.addEventListener("keyup", this.keyboard.bind(this));
    }

    componentWillUnmount = () => { 
        window.removeEventListener("keyup", this.keyboard.bind(this)); 
    }

    keyboard = (e) => {
        if(!this.state) { if(this.state.selected === '') { return } return }
        e.stopPropagation()
        e.preventDefault()
        var ekey = e.key.toLowerCase()
        var controls = JSON.parse(JSON.stringify(this.state.controls))
        var selected = this.state.selected
        const index = getIndex(controls, selected)
        if(index !== -1) {
            if(ekey === "delete") {
                controls.splice(index, 1)
                this.setState({ selected: '', controls: controls, changed: true })
            }
            else if (e.ctrlKey) {
                if(ekey === 'd' || ekey === 'm') {
                    e.preventDefault()
                    var control = JSON.parse(JSON.stringify(controls[index]))
                    control.style.left = parseInt(control.style.left.substring(0, control.style.left.length-2)) + 60 + 'px'
                    control.style.top = parseInt(control.style.top.substring(0, control.style.top.length-2)) + 60 + 'px'
                    control.key = idGenerator()
                    controls.push(control)
                    this.setState({ selected: control.key, controls: controls, changed: true })
                }
            }
        }
    }

    saveWork = (e) => {
        e.stopPropagation()
        if(this.state.name === "") { this.setState({name: "unknown"}) }
        this.setState({changed: false})
        this.props.saveWork(
            this.props.wireframe, this.state.controls, 
            (this.state.name === "") ? "unknown" : this.state.name,
            this.state.width, this.state.height
        )
    }
    closeWork = (e) => {
        e.stopPropagation()
        this.props.history.push('/')
    }
    nameChange = (e) => {
        var name = e.target.value
        this.setState({changed: true, name: name})
    }
    zoomIn = (e) => { this.setState({zoom: 2*this.state.zoom}) }
    zoomOut = (e) => { this.setState({zoom: 0.5*this.state.zoom}) }
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
        var controls = this.state.controls
        const i = getIndex(controls, key)
        controls[i].style.top = y
        controls[i].style.left = x
        this.setState({ controls: controls, changed: true });
    }
    resizeWireframe = (width, height, e) => {
        this.setState({ width: width, height: height, changed: true})
        var controls = this.state.controls
        controls = controls.map( (control) => {  
            var w =  parseInt(control.style.width.substring(0, control.style.width.length-2))
            var h =  parseInt(control.style.height.substring(0, control.style.height.length-2))
            var x =  parseInt(control.style.left.substring(0, control.style.left.length-2))
            var y =  parseInt(control.style.top.substring(0, control.style.top.length-2))
            var width_int = parseInt(width.substring(0, width.length-2))
            var height_int = parseInt(height.substring(0, height.length-2))
            if(w + x >  width_int) {
                control.style.left = width_int - w + 'px'
            }
            if(h + y >  height_int) {
                control.style.top = height_int - h + 'px'
            }
            return control
        })
        this.setState({ controls: controls })
    }

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid || !wireframe) {
            return <Redirect to="/" />;
        }

        return (
            <div id="edit_screen" className="grey lighten-3 row">
                <Controls
                    saveWork={this.saveWork}
                    closeWork={this.closeWork}
                    zoomIn={this.zoomIn}
                    zoomOut={this.zoomOut}
                    addControl={this.addControl}
                    any={this.state.changed}
                />
                <Wireframe wireframe={wireframe}
                    controls={this.state.controls} 
                    selectControl={this.selectControl}
                    unselect={this.unselect}
                    nameChange={this.nameChange}
                    name={this.state.name}
                    resize={this.resize}
                    resizeWireframe={this.resizeWireframe}
                    selected={this.state.selected}
                    drag={this.drag}
                    zoom={this.state.zoom}/>
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
    saveWork: (wireframe, controls, name, width, height) => dispatch(saveWorkHandler(wireframe, controls, name, width, height)),
    updateTime: (wireframe) => dispatch(updateTimeHandler(wireframe)),  
    nameChange: (wireframe, name) => dispatch(nameChangeHandler(wireframe, name))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(EditScreen);
  