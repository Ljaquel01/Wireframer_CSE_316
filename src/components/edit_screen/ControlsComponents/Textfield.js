import React from 'react';

class Textfield extends React.Component {

    render() {
        const { control } = this.props;
        var style = control ? control.style : null
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
        return (
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