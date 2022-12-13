import * as Updates from "expo-updates";

export const useExpoUpdates = () => {
  if(!__DEV__) {
    setInterval(() => {
      Updates.checkForUpdateAsync().then((e) => {
        if (e.isAvailable) {
          Updates.fetchUpdateAsync().then((e) => {
            if (e.isNew) {
              Updates.reloadAsync().then(() => console.log("refreshed"));
            }
          });
        }
      });
    }, 5000);
  }
};
