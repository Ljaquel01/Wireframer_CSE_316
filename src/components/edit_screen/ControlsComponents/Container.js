import React from 'react';
import { Rnd } from "react-rnd";

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
        height: this.props.control ? this.props.control.style.height : '80px',
        x: this.props.control ? this.props.control.style.left : '0px',
        y: this.props.control ? this.props.control.style.top : '0px',
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
                cursor: 'pointer',
            }
        }
        var sel = false
        if(control) { sel = this.props.selected === control.key ? true : false }
        const enable = { top:sel, right:sel, bottom:sel, left:sel, topRight:sel, bottomRight:sel, bottomLeft:sel, topLeft:sel }
        return (
            this.props.control 
            ?
            <Rnd bounds="parent" style={style} disableDragging={!sel} enableResizing={enable}
                minWidth={30} minHeight={30} className='hoverable'
                position={{ 
                    x: parseInt(this.state.x.substring(0, this.state.x.length)), 
                    y: parseInt(this.state.y.substring(0, this.state.y.length))}}
                size={{ 
                    width: parseInt(this.state.width.substring(0, this.state.width.length)), 
                    height: parseInt(this.state.height.substring(0, this.state.height.length)),
                }}
                onResize={(e, direction, ref, d, position) => {
                    this.setState({
                        width: ref.offsetWidth + 'px', height: ref.offsetHeight + 'px',
                        x: position.x + 'px', y: position.y + 'px',
                    }, () => { this.props.resize(this.state.width, this.state.height, this.props.control.key) })
                }}
                onDragStop={(e, d) => { console.log(d.x + " " + d.y);this.setState({ x: d.x + 'px', y: d.y + 'py'},
                    () => {this.props.drag(this.state.x, this.state.y, this.props.control.key)}) }}
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key) }       
                >
                {sel ? resizers : <div></div>}
            </Rnd>
            : 
            <div name="container" className="center" style={style}
                onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key) } >
            </div>
        );
    }
}
export default Container;