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
            <div>
                <button onClick={this.props.addControl ? this.props.addControl : this.props.selectControl.bind(this, control.key)} 
                    style={style} name='button'>{!control ? "Submit" : control.text}
                </button>
            </div>
        );
    }
}
export default Button;