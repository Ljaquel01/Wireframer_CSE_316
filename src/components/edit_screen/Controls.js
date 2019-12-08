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
                <div className="row z-depth-1">
                    <div className="col s1 controlTools" name="in" onClick={this.props.zoom}><i className="material-icons">zoom_in</i></div>
                    <div className="col s1 offset-s1 controlTools" name="out" onClick={this.props.zoom}><i className="material-icons">zoom_out</i></div>
                    <h6 className={saveButtonStyle} onClick={this.props.saveWork}>Save</h6>
                    <h6 className="col s1 offset-s1 btn-flat controlTools" onClick={this.props.closeWork}>Close</h6>
                </div>
                <div className="row">
                    <div className="col s12"> 
                        <div name="container" className="center-align"> <Container addControl={this.props.addControl.bind(this, "container")}/> </div> 
                    </div>
                    <div className="col s12 center-align">Container</div>
                    <div className="col s12"> 
                        <div name="label" className="center-align labelControl"> <Label addControl={this.props.addControl.bind(this, "label")}/> </div>
                    </div>
                    <div className="col s12 center-align">Label</div>
                    <div className="col s12"> 
                        <div className="center-align buttonControl"> <Button addControl={this.props.addControl.bind(this, "button")}/> </div>
                    </div>
                    <div className="col s12 center-align">Button</div>
                    <div className="col s12"> 
                        <div className="center-align textfieldControl"> <Textfield addControl={this.props.addControl.bind(this, "textfield")}/> </div>
                    </div>
                    <div className="col s12 center-align">Textfield</div>
                </div>
            </div>
        );
    }
}
export default Controls;