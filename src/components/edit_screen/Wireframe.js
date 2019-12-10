import React from 'react';
import Container from './ControlsComponents/Container'
import Button from './ControlsComponents/Button'
import Label from './ControlsComponents/Label'
import Textfield from './ControlsComponents/Textfield'

class Wireframe extends React.Component {
    
    render() {
        const { controls } = this.props
        return (
            <div className="col s7" onClick={this.props.unselect}>
                <div className="row">
                    <input type="text" value={this.props.name} 
                    className="col s10 offset-s1" onChange={this.props.nameChange}></input>
                </div>
                <div id="wireframe">
                    {controls && controls.map(control => (
                        control.type === "container" ? 
                            <Container control={control} selected={this.props.selected}
                            key={control.key} selectControl={this.props.selectControl} 
                            resize={this.props.resize} drag={this.props.drag} /> :
                        control.type === "button" ? 
                            <Button control={control} selected={this.props.selected} 
                            key={control.key} selectControl={this.props.selectControl}
                            drag={this.props.drag} resize={this.props.resize} /> :
                        control.type === "label" ? 
                            <Label control={control} selected={this.props.selected}
                            key={control.key} selectControl={this.props.selectControl}
                            resize={this.props.resize} drag={this.props.drag} /> :
                        control.type === "textfield" ? 
                            <Textfield control={control} selected={this.props.selected}
                            key={control.key} selectControl={this.props.selectControl}
                            resize={this.props.resize} drag={this.props.drag} /> : 
                        null
                    ))}
                </div>
            </div>

        );
    }
}
export default Wireframe;