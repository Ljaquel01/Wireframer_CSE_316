import React from 'react';
import { Resizable } from "re-resizable";

const resizers =
    <div>
        <div className="resizer nw"></div>
        <div className="resizer ne"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
    </div>

class Button extends React.Component {
    state = {
        width: this.props.control ? this.props.control.style.width : '80px',
        height: this.props.control ? this.props.control.style.height : '25px'
    }

    render() {
        const { control } = this.props;
        var sel = false
        if(control) { sel = this.props.selected === control.key ? true : false }
        const enable = { top:sel, right:sel, bottom:sel, left:sel, topRight:sel, bottomRight:sel, bottomLeft:sel, topLeft:sel }
        var style = control ? JSON.parse(JSON.stringify(control.style)) : null
        if(!style || style === '') {
            style = {
                width: '80px',
                height: '25px',
                backgroundColor: '#FFFFFF',
                borderColor: "#000000",
                borderRadius: "5px",
                borderStyle: 'solid',
                borderWidth: "1px",
                fontSize: "15px",
                left: '0px',
                color: '#000000',
                top: '0px'
            }
        }
        const inStyle = {
            fontSize: style.fontSize,
            color: style.color,
            borderWidth: '0px', 
            backgroundColor: 'rgba(52, 52, 52, 0)',
        }
        return (
            this.props.control 
            ?
            <Resizable size={{ width: this.state.width, height: this.state.height }}
                className="button_res" style={style} name='button' enable={enable}
                bounds= 'parent'
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)}       
                onResizeStop={(e, direction, ref, d) => {
                    var w = parseInt(this.state.width.substring(0,this.state.width.length)) + d.width + "px"
                    var h = parseInt(this.state.height.substring(0,this.state.height.length)) + d.height + "px"
                    this.setState({
                        width: w,
                        height: h,
                    }, () => {this.props.resize(w, h, this.props.control.key)})
                }} >
                <button style={inStyle} className='control_center'>{!control ? "Submit" : control.text} </button>
                {sel ? resizers : <div></div>}
            </Resizable>
            : 
            <div>
                <button onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)} 
                    style={style} className="button" name='button'>{!control ? "Submit" : control.text}
                </button>
            </div>
        );
    }
}
export default Button;