import React from 'react';
import { Resizable } from "re-resizable";

const resizers =
    <div>
        <div className="resizer nw"></div>
        <div className="resizer ne"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
    </div>

class Textfield extends React.Component {
    state = {
        width: this.props.control ? this.props.control.style.width : '10px',
        height: this.props.control ? this.props.control.style.height : '40px'
    }

    render() {
        const { control } = this.props;
        var sel = false
        if(control) { sel = this.props.selected === control.key ? true : false }
        const enable = { top:sel, right:sel, bottom:sel, left:sel, topRight:sel, bottomRight:sel, bottomLeft:sel, topLeft:sel }
        var style = control ? JSON.parse(JSON.stringify(control.style)) : null
        var b = false
        if(!style) {
            style = {
                width: '100px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                borderRadius: "6px",
                borderStyle: 'solid',
                borderWidth: "1px",
                fontSize: "12px",
                left: '0px',
                color: '#000000',
                top: '0px',
            }
            b = true
        }
        const inStyle = {
            fontSize: style.fontSize,
            color: style.color,
            borderWidth: '0px', 
        }
        return (
            this.props.control 
            ?
            <Resizable size={{ width: this.state.width, height: this.state.height }}
                className="textfield_res" style={style} name='textfield' enable={enable}
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
                <input type="text" disabled= {b} readOnly className='textfield'
                    value={!control ? "Input" : control.value} style={inStyle}>
                </input>
                {sel ? resizers : <div></div>}
            </Resizable>
            : 
            <div>
                <input type="text" className="textfield"
                    onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)} 
                    disabled= {b} readOnly
                    value={!control ? "Input" : control.value} style={style} name='textfield'>
                </input>
            </div>
        );
    }
}
export default Textfield;