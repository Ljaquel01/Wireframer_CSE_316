import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { createWireframeHandler } from '../../store/database/asynchHandler'

class HomeScreen extends Component {

    handleNewWireframe = (e) => {
        e.preventDefault();
        const newWireframe = {name: "Unknown", user: "", controls:[], lastModified: new Date()}
        this.props.createWireframe(newWireframe)
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container home_box">
                <div className="row">
                    <div className="col s12 m4 wireframe_links">
                        <WireframeLinks />
                    </div>

                    <div className="col s8 banners">
                        <div id="banner" className="banner">
                            Wireframe<br/>
                            Manager
                        </div>
                        
                        <div className="home_new_wireframe_container">
                                <button className="home_new_wireframe_button white-text hoverable z-depth-1" onClick={this.handleNewWireframe}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createWireframe: (wireframe) => dispatch(createWireframeHandler(wireframe))    
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'wireframes' },
    ]),
)(HomeScreen);