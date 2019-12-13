import React from 'react';
import { Rnd } from "react-rnd";

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
        height: this.props.control ? this.props.control.style.height : '30px',
        x: this.props.control ? this.props.control.style.left : '2px',
        y: this.props.control ? this.props.control.style.top : '2px',
    }

    toInt(s) {
        return (parseInt(s.substring(0, s.length-2)))
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
                borderRadius: "15px",
                borderStyle: 'solid',
                borderWidth: "1px",
                fontSize: "15px",
                left: '0px',
                color: '#000000',
                top: '0px',
                cursor: 'pointer'
            }
        }
        const inStyle = {
            fontSize: style.fontSize,
            color: style.color,
            borderWidth: '0px', 
            backgroundColor: 'rgba(52, 52, 52, 0)',
            cursor: 'default'
        }
        style.textAlign = 'center'
        style.lineHeight = this.toInt(style.height) - 2*this.toInt(style.borderWidth) + 'px'
        if(sel) {style.cursor = 'move'; inStyle.cursor = 'move'; style.zIndex= 1}
        return (
            this.props.control 
            ?
            <Rnd bounds="parent" style={style} disableDragging={!sel} enableResizing={enable}
                minWidth={30} minHeight={30} className='hoverable button_rnd' scale={this.props.zoom}
                position={{ 
                    x: parseInt(this.state.x.substring(0, this.state.x.length-2)), 
                    y: parseInt(this.state.y.substring(0, this.state.y.length-2))}}
                size={{ 
                    width: parseInt(this.state.width.substring(0, this.state.width.length-2)), 
                    height: parseInt(this.state.height.substring(0, this.state.height.length-2)),
                }}
                onResize={(e, direction, ref, d, position) => {
                    this.setState({
                        width: ref.offsetWidth + 'px',
                        height: ref.offsetHeight + 'px',
                        x: position.x + 'px',
                        y: position.y + 'px'
                    }, () => { this.props.resize(this.state.width, this.state.height, this.props.control.key) })
                }}
                onDragStop={(e, d) => { this.setState({ x: d.x + 'px', y: d.y + 'px'},
                    () => {this.props.drag(d.x + 'px', d.y + 'px', this.props.control.key)}) }}
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key) }>
                    <button style={inStyle} className='control_center button button_w'>{!control ? "Submit" : control.text} </button>
                    {sel ? resizers : <div></div>}
            </Rnd>
            : 
            <div>
                <button onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)} 
                    style={style} className="button hoverable" name='button'>{!control ? "Button" : control.text}
                </button>
            </div>
        );
    }
}
export default Button;