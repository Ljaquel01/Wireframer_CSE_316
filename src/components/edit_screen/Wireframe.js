import React from 'react';
import Container from './ControlsComponents/Container'
import Button from './ControlsComponents/Button'
import Label from './ControlsComponents/Label'
import Textfield from './ControlsComponents/Textfield'

class Wireframe extends React.Component {
    state = {
        w: this.props.wireframe ? this.props.wireframe.width : '600px',
        h:  this.props.wireframe ? this.props.wireframe.height : '400px',
        width: this.props.wireframe ? this.props.wireframe.width : '600px',
        height:  this.props.wireframe ? this.props.wireframe.height : '400px',
        enable: false
    }
    
    sizeChange = (e) => {
        const { name, value } = e.target
        if(name==='w') { this.setState({w: value + 'px', enable: true})}
        else if (name === 'h') { this.setState({h: value + 'px', enable: true}) }
    }

    resize = () => {
        this.setState({enable: false, width: this.state.w, height: this.state.h})
        this.props.resizeWireframe(this.state.w, this.state.h, {})
    }

    render() {
        const { controls, selected, selectControl, drag, resize, zoom } = this.props

        var style = {
            width: this.state.width,
            height: this.state.height,
            transform: 'scale('+this.props.zoom+')'
        }

        return (
            <div className="col s8" id='wireframe_wrapper' onClick={this.props.unselect}>
                <div className="row" style={{margin: '0'}}>
                    <div className="col s1 prompt title_">Name:</div>
                    <input type="text" value={this.props.name} 
                        className="col s4 dimension" onChange={this.props.nameChange}></input>
                    <div className="col s1 prompt title_">W:</div>
                    <input type="number"  name="w"
                        value={parseInt(this.state.w.substring(0, this.state.w.length-2))}
                        className="col s1 dimension" onChange={this.sizeChange}></input>
                    <div className="col s1 prompt title_">H:</div>
                    <input type="number" name = "h"
                        value={parseInt(this.state.h.substring(0, this.state.h.length-2))} 
                        className="col s1 dimension" onChange={this.sizeChange}></input>
                    <button className="col s2 offset-s1 btn valign-wrapper" disabled={!this.state.enable} 
                        onClick={this.resize}>Update</button>
                </div>
                <div id="wireframe" style={style}>
                    {controls && controls.map(control => (
                        control.type === "container" ? 
                            <Container control={control} selected={selected}
                            key={control.key} selectControl={selectControl} 
                            resize={resize} drag={drag} zoom={zoom} /> :
                        null
                    ))}
                    {controls && controls.map(control => (
                        control.type === "button" ? 
                            <Button control={control} selected={selected} 
                            key={control.key} selectControl={selectControl}
                            drag={drag} resize={resize} zoom={zoom} /> :
                        control.type === "label" ? 
                            <Label control={control} selected={selected}
                            key={control.key} selectControl={selectControl}
                            resize={resize} drag={drag} zoom={zoom} /> :
                        control.type === "textfield" ? 
                            <Textfield control={control} selected={selected}
                            key={control.key} selectControl={selectControl}
                            resize={resize} drag={drag} zoom={zoom} /> : 
                        null
                    ))}
                </div>
            </div>
        );
    }
}
export default Wireframe;