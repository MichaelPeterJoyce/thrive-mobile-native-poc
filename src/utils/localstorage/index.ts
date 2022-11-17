export function localstorageEventEmitter() {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    const event = new Event("itemInserted");
    document.dispatchEvent(event);
    originalSetItem.apply(this, arguments);
  };
  const localStorageSetHandler = function (e) {
    const tokenLocalStorage = window.localStorage.getItem("THRIVEGLOBAL_STATE");
    // @ts-ignore
    window.ReactNativeWebView.postMessage(tokenLocalStorage);
  };
  document.addEventListener("itemInserted", localStorageSetHandler, false);
}
