import React from 'react'
import { connect } from 'react-redux';
import wireframerJson from './TestWireframerData.json'
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        wireframerJson.wireframes.forEach(wireframerJson => {
            fireStore.collection('wireframes').add({
                    name: wireframerJson.name,
                    user: wireframerJson.user,
                    lastModified: new Date(),
                    controls: wireframerJson.controls
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {
        const {profile} = this.props.firebase
        if(!this.props.auth.uid || (profile.isLoaded && !profile.administrator)) {
            return <Redirect to="/"/>
        }
        if(!profile.isLoaded) { return ( <div> <h5>Loading...</h5> </div> ) }
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);