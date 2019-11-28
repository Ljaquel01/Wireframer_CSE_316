import React from 'react';

class Label extends React.Component {

    render() {
        const { control } = this.props;
        var style = control ? control.style : null
        if(!style) {
            style = {
                width: '80px',
                height: '50px',
                backgroundColor: '',
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
        const t = "Prompt for inputs"
        return (
            <div className="labelControl">
                <label className="label" onClick={this.props.addControl} 
                    style={style} name='label'>
                    {control ? control.text ? control.text : t : t}
                </label>
            </div>
        );
    }
}
export default Label;