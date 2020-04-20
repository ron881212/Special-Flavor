import { reactotronRedux } from 'reactotron-redux'
import Reactotron from 'reactotron-react-native'
// import AsyncStorage from 'react-native'

const reactotron = Reactotron
//   .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ name: 'Special Flavor'}) // controls connection & communication settings
  .use(reactotronRedux()) //  <- connecting react redux to reactotron!
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!
  console.tron = Reactotron
export default reactotron