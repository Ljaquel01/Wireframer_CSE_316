import React, { Component } from 'react';
import Container from './ControlsComponents/Container'
import Label from './ControlsComponents/Label'
import Button from './ControlsComponents/Button'
import Textfield from './ControlsComponents/Textfield'

class Controls extends Component {

    render() {
        return (
            <div id="controls" className="grey lighten-3 col s3">
                <div className="row z-depth-1">
                    <div className="col s2" name="in" onClick={this.props.zoom}><i className="material-icons">zoom_in</i></div>
                    <div className="col s2 offset-s1" name="out" onClick={this.props.zoom}><i className="material-icons">zoom_out</i></div>
                    <h6 className="col s2 offset-s1 btn-flat black-text" onClick={this.props.saveWork}>Save</h6>
                    <h6 className="col s2 offset-s1 btn-flat black-text" onClick={this.props.closeWork}>Close</h6>
                </div>
                <div className="row">
                    
                    <div className="col s12"> 
                        <div> <Container addControl={this.props.addControl}/> </div> 
                    </div>
                    <div className="col s12 center-align">Container</div>
                    <div className="col s12"> 
                        <div className="center-align"> <Label addControl={this.props.addControl}/> </div>
                    </div>
                    <div className="col s12 center-align">Label</div>
                    <div className="col s12"> 
                        <div className="center-align"> <Button addControl={this.props.addControl}/> </div>
                    </div>
                    <div className="col s12 center-align">Button</div>
                    <div className="col s12"> 
                        <div className="center-align"> <Textfield addControl={this.props.addControl}/> </div>
                    </div>
                    <div className="col s12 center-align">Textfield</div>
                </div>
            </div>
        );
    }
}
export default Controls;