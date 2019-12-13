import React from 'react';

const getIndex = (list, key) => {
  for (let i = 0; i < list.length; i++) { 
    if (list[i].key.toString() === key.toString()) { return i }
  }
  return -1
};

class Properties extends React.Component {

    render() {
        const { selected, controls } = this.props
        if(selected === '') { 
            return ( <div id="properties" className="grey lighten-3 col s2 title_">
                        <div>Properties</div>
                        <div className="divider black"></div>
                    </div> ) 
        }
        const back = controls
        
        const control = controls.filter((control) => {return control.key === selected})[0]
        const index = getIndex(back, selected)
        return (
            <div id="properties" className="grey lighten-3 col s2 title_">
                <h6>Properties</h6>
                <div className="divider black"></div>
                {control.type === 'container' ? <div></div> : 
                    <div>
                        <div className="row valign-wrapper props">
                            <label className="col s4 black-text">Text: </label>
                            <input className="col s8" name="text" type="text" 
                                value={control.text ? control.text : control.value} 
                                onChange={this.props.change.bind(this, index)}>
                            </input>
                        </div>
                        <div className="row valign-wrapper props">
                            <label className="col s4 black-text">Color: </label>
                            <input className="col s4 offset-s4" name="color" type="color" 
                                value={control.style.color} 
                                onChange={this.props.change.bind(this, index)}>
                            </input>
                        </div> 
                        <div className="row valign-wrapper props">
                            <label className="col s4 black-text">Font Size: </label>
                            <input className="col s4 offset-s4" name="fontSize" type="number" 
                                value={control.style.fontSize ? control.style.fontSize.substring(0, control.style.fontSize.length-2) : '10px'} 
                                onChange={this.props.change.bind(this, index)}>
                            </input>
                        </div>
                    </div>}
                <div className="row valign-wrapper props">
                    <label className="col s4 black-text">Background: </label>
                    <input className="col s4 offset-s4" name="backgroundColor" type="color" 
                        value={ control.style.backgroundColor ? control.style.backgroundColor : '#FFFFFF' } 
                        onChange={this.props.change.bind(this, index)}>
                    </input>
                </div>
                <div className="row valign-wrapper props">
                    <label className="col s4 black-text">Border Color: </label>
                    <input className="col s4 offset-s4" name="borderColor" type="color" 
                        value={control.style.borderColor} 
                        onChange={this.props.change.bind(this, index)}>
                    </input>
                </div>
                <div className="row valign-wrapper props">
                    <label className="col s4 black-text">Border Width: </label>
                    <input className="col s4 offset-s4" name="borderWidth" type="number" min="0" max="250" step="1" 
                        value={control.style.borderWidth ? control.style.borderWidth.substring(0, control.style.borderWidth.length-2) : '0px'} 
                        onChange={this.props.change.bind(this, index)}>
                    </input>
                </div>
                <div className="row valign-wrapper props">
                    <label className="col s4 black-text">Border Radius: </label>
                    <input className="col s4 offset-s4" name="borderRadius" type="number" min="0" max="250" step="1" 
                        value={control.style.borderRadius ? control.style.borderRadius.substring(0, control.style.borderRadius.length-2) : '0px'} 
                        onChange={this.props.change.bind(this, index)}>
                    </input>
                </div>
            </div>
        );
    }
}
export default Properties;