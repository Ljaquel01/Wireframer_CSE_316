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
            return ( <div id="properties" className="grey lighten-3 col s3"></div> ) 
        }
        const back = controls
        
        const control = controls.filter((control) => {return control.key === selected})[0]
        const index = getIndex(back, selected)
        return (
            <div id="properties" className="grey lighten-3 col s3">
                <input name="text" type="text" 
                    value={control.text ? control.text : control.value} 
                    onChange={this.props.change.bind(this, index)}>
                </input>
                <input name="backgroundColor" type="color" 
                    value={control.style.backgroundColor} 
                    onChange={this.props.change.bind(this, index)}>
                </input>
            </div>
        );
    }
}
export default Properties;