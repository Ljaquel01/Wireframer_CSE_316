import React from 'react';
import { Resizable } from "re-resizable";

const resizers =
    <div>
        <div className="resizer nw"></div>
        <div className="resizer ne"></div>
        <div className="resizer sw"></div>
        <div className="resizer se"></div>
    </div>

class Container extends React.Component {
    state = {
        width: this.props.control ? this.props.control.style.width : '150px',
        height: this.props.control ? this.props.control.style.height : '80px'
    }

    render() {
        const { control } = this.props;
        var style = control ? control.style : null
        if(!style || style === '') {
            style = {
                width: '150px',
                height: '80px',
                backgroundColor: 'white',
                borderColor: "#000000",
                borderRadius: "5px",
                borderStyle: 'solid',
                borderWidth: "1px",
                fontSize: "15px",
                left: '0px',
                color: '#000000',
                top: '0px',
                zIndex: "-1"
            }
        }
        var sel = false
        if(control) { sel = this.props.selected === control.key ? true : false }
        const enable = { top:sel, right:sel, bottom:sel, left:sel, topRight:sel, bottomRight:sel, bottomLeft:sel, topLeft:sel }
        return (
            this.props.control 
            ?
            <Resizable size={{ width: this.state.width, height: this.state.height }}
                name="container" className="center" style={style} enable={enable}
                bounds= 'parent'
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key) }       
                onResizeStop={(e, direction, ref, d) => {
                    var w = parseInt(this.state.width.substring(0,this.state.width.length)) + d.width + "px"
                    var h = parseInt(this.state.height.substring(0,this.state.height.length)) + d.height + "px"
                    this.setState({
                        width: w,
                        height: h,
                    }, () => {this.props.resize(w, h, this.props.control.key)})
                }} >
                {sel ? resizers : <div></div>}
            </Resizable>
            : 
            <div name="container" className="center" style={style}
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key) } >
            </div>
        );
    }
}
export default Container;