import React from 'react';
import { Resizable } from "re-resizable";

const resizers =
    <div>
        <div className="resizer nw"></div>
        <div className="resizer ne"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
    </div>

class Label extends React.Component {
    state = {
        width: this.props.control ? this.props.control.style.width : '80px',
        height: this.props.control ? this.props.control.style.height : '50px'
    }

    render() {
        const { control } = this.props;
        var sel = false
        if(control) { sel = this.props.selected === control.key ? true : false }
        var style = control ? JSON.parse(JSON.stringify(control.style)) : null
        if(!style) {
            style = {
                width: '80px',
                height: '50px',
                backgroundColor: '#FFFFFF',
                borderColor: "#000000",
                borderRadius: "6px",
                borderStyle: 'solid',
                borderWidth: "0px",
                fontSize: "12px",
                left: '0px',
                color: '#000000',
                top: '0px',
            }
        }
        const inStyle = {
            fontSize: style.fontSize,
            color: style.color,
            display: 'inline-block'
        }
        const t = "Prompt for inputs"
        const enable = { top:sel, right:sel, bottom:sel, left:sel, topRight:sel, bottomRight:sel, bottomLeft:sel, topLeft:sel }
        return (
            this.props.control 
            ?
            <Resizable size={{ width: this.state.width, height: this.state.height }}
                className="label_res" style={style} name='label' enable={enable}
                bounds= 'parent'
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)}       
                onResizeStart={(e) => {e.stopPropagation()}}
                onResize={(e) => {e.stopPropagation()}}
                onResizeStop={(e, direction, ref, d) => {
                    var w = parseInt(this.state.width.substring(0,this.state.width.length)) + d.width + "px"
                    var h = parseInt(this.state.height.substring(0,this.state.height.length)) + d.height + "px"
                    this.setState({
                        width: w,
                        height: h,
                    }, () => {this.props.resize(w, h, this.props.control.key)})
                }} >
                <label style={inStyle} className="control_center"> {control ? control.text ? control.text : t : t} </label>
                {sel ? resizers : <div></div>}
            </Resizable>
            : 
            <div>
                <label className="label" onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)} 
                    style={style} name='label'>
                    {control ? control.text ? control.text : t : t}
                </label>
            </div>
        );
    }
}
export default Label;