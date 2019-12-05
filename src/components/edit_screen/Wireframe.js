import React from 'react';
import Container from './ControlsComponents/Container'
import Button from './ControlsComponents/Button'
import Label from './ControlsComponents/Label'
import Textfield from './ControlsComponents/Textfield'

class Wireframe extends React.Component {
    
    render() {
        const { controls } = this.props
        return (
            <div className="col s7" onClick={this.props.unselect}>
                <div id="wireframe">
                    {controls && controls.map(control => (
                        control.type === "container" ? <Container control={control} 
                            key={control.key} selectControl={this.props.selectControl} /> :
                        control.type === "button" ? <Button control={control} 
                            key={control.key} selectControl={this.props.selectControl} /> :
                        control.type === "label" ? <Label control={control} 
                            key={control.key} selectControl={this.props.selectControl} /> :
                        control.type === "textfield" ? <Textfield control={control} 
                            key={control.key} selectControl={this.props.selectControl} /> : 
                        null
                    ))}
                </div>
            </div>

        );
    }
}
export default Wireframe;