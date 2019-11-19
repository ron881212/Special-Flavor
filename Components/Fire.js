import firebase from 'react-native-firebase'

class Fire {

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  get ref() {
      // found another ref
    return firebase.database().ref('messages')
  }

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

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message)
    }
    console.log(this.ref.on)
  };

  append = message => this.ref.push(message)
}

Fire.shared = new Fire()
export default Fire