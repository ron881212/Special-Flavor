import firebase from 'react-native-firebase'

class Fire {

  // current user Uid is set when the home screen mounts
  static customUid;

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  get ref() {
      // found another ref
    return firebase.database().ref('messages')
  }

  get ref2() {
    return firebase.database().ref(Fire.customUid)
  }

  // setRef(customUid) {
  //   return firebase.database().ref(customUid)
  //   customUid = 'this'
  // }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val()
    const { key: _id } = snapshot
    const timestamp = new Date(numberStamp)
    const message = {
      _id,
      createdAt: timestamp,
      text,
      user,
    };
    return message
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)))

  on2 = callback =>
    this.ref2
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)))
  
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i]
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message)
    }
    console.log(this.ref.on)
  }

  send2 = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i]
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append2(message)
    }
    console.log(this.ref.on)
  }
  
  append = message => this.ref.push(message)

  append2 = message => this.ref2.push(message)

}

Fire.shared = new Fire()
export default Fire