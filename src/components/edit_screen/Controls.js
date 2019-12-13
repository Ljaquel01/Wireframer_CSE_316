import React, { Component } from 'react';
import Container from './ControlsComponents/Container'
import Label from './ControlsComponents/Label'
import Button from './ControlsComponents/Button'
import Textfield from './ControlsComponents/Textfield'

class Controls extends Component {

    render() {
        var saveButtonStyle = "col s1 offset-s2 btn-flat controlTools"
        if (!this.props.any) { saveButtonStyle += " disabled" }
        return (
            <div id="controls" className="grey lighten-3 col s2">
                <div className="row z-depth-1 title_one">
                    <div className="col s1 controlTools" name='in' onClick={this.props.zoomIn}>
                        <i name='in' className="material-icons">zoom_in</i>
                    </div>
                    <div className="col s1 offset-s1 controlTools" name="out" onClick={this.props.zoomOut}>
                        <i name='out' className="material-icons">zoom_out</i>
                    </div>
                    <h6 className={saveButtonStyle} onClick={this.props.saveWork}>
                        <i name='save' className="material-icons">save</i>
                    </h6>
                    <h6 className="col s1 offset-s1 btn-flat controlTools" onClick={this.props.closeWork}>
                        <i name='close' className="material-icons">close</i>
                    </h6>
                </div>
                <div className="row center-align" id="title">
                    <h6 className="col s12 title_">Click Element to Add</h6>
                </div>
                <div className="row">
                    <div className="col s12"> 
                        <div name="container" className="center-align"> <Container resize={this.props.resize} addControl={this.props.addControl.bind(this, "container")}/> </div> 
                    </div>
                    <div className="col s4 offset-s4"> 
                        <div name="label" className="center-align labelControl"> <Label addControl={this.props.addControl.bind(this, "label")}/> </div>
                    </div>
                    <div className="col s12 center-align buttonControl"> <Button addControl={this.props.addControl.bind(this, "button")}/> </div>
                    <div className="col s12"> 
                        <div className="center-align textfieldControl"> <Textfield addControl={this.props.addControl.bind(this, "textfield")}/> </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Controls;