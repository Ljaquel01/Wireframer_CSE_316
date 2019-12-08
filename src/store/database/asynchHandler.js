import * as actionCreators from '../actions/actionCreators.js'

export const idGenerator = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const getIndex = (list, key) => {
  for (let i = 0; i < list.length; i++) { 
    if (list[i].key.toString() === key.toString()) { return i }
  }
  return -1
};

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};

export const createWireframeHandler = (wireframe) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('wireframes').add({
    ...wireframe
  }).then((wireframe) => {
    dispatch(actionCreators.createWireframe(wireframe));
  }).catch((err) => {
    dispatch(actionCreators.createWireframeError(err));
  })
};

export const saveWorkHandler = (wireframe, controls, name) => (dispatch, getState, { getFirestore }) => {
  if(name === '') { name = "unknown"}
  const firestore = getFirestore();
  firestore.collection('wireframes').doc(wireframe.id).update({controls: controls, name: name})
  .then(() => {
    dispatch(actionCreators.saveWork(controls))
  })
};

export const updateTimeHandler = (wireframe) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  firestore.collection('wireframes').doc(wireframe.id).update({lastModified: new Date()})
  .then(() => {
    dispatch(actionCreators.updateTime(wireframe))
  })
}

export const deleteWireframeHandler = (id) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  firestore.collection('wireframes').doc(id).delete()
  .then(() => {
    dispatch(actionCreators.deleteWireframe(id))
  })
}

export const nameChangeHandler = (wireframe, name) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection('wireframes').doc(wireframe.id).update({ name: name })
    .then(() => {
      dispatch(actionCreators.nameChange(name))
    })
};