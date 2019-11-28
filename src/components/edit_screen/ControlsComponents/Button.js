import React from 'react';

class Button extends React.Component {

    render() {
        const { control } = this.props;
        var style = control ? control.style : null
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
        return (
            <button className="buttonControl center-align" onClick={this.props.addControl} 
                style={style} name='button'>{!control ? "Submit" : control.text}
            </button>
        );
    }
}
export default Button;