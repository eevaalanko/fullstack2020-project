import AsyncStorage from "@react-native-community/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem(
        `${this.namespace}:accessToken`
      );
      return accessToken != null ? JSON.parse(accessToken) : [];
    } catch (e) {
      console.log(e);
    }
  };

  setAccessToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        JSON.stringify(accessToken)
      );
    } catch (e) {
      console.log(e);
    }
  };

  removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (e) {
      console.log(e);
    }
  };
}

export default AuthStorage;
