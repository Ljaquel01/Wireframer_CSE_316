import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

class WireframeLinks extends React.Component {
    compare = (item1, item2) => {
        if (item1.lastModified < item2.lastModified) { return 1; }
        else if (item1.lastModified > item2.lastModified) { return -1; }
        else { return 0; }
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        var wireframes = this.props.wireframes ? this.props.wireframes.sort(this.compare) : null
        if(wireframes) { wireframes = wireframes.filter((w) => {return w.user === this.props.auth.uid })}
        return (
            <div className="wireframes section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.id} key={wireframe.id}>
                        <div className="card z-depth-1 wireframe-link green lighten-5 hoverable">
                            <div className="card-content grey-text text-darken-4">
                                <span className="card-title">{wireframe.name}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);