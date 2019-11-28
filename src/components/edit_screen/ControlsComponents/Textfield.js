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
                backgroundColor: '',
                borderRadius: "6px",
                borderStyle: 'solid',
                borderWidth: "1px",
                fontSize: "12px",
                left: '0px',
                fontColor: '#000000',
                top: '0px',
            }
            b = true
        }
        return (
            <div className="textfieldControl">
                <input type="text"  className="textfield"
                    onClick={this.props.addControl} disabled= {b} 
                    value={!control ? "Input" : control.value} style={style} name='textfield'>
                </input>
            </div>
        );
    }
}
export default Textfield;