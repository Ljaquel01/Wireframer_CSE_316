import React from 'react';

class Container extends React.Component {

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
        return (
            <div className="containerControl" onClick={this.props.addControl} 
                style={style} name='container'>
            </div>
        );
    }
}
export default Container;