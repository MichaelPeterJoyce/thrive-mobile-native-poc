export const browserInjectionJavascript = `(function() {
  window.isRunningInWebView = true
  
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    const event = new Event("itemInserted");
    document.dispatchEvent(event);
    originalSetItem.apply(this, arguments);
  };
  const localStorageSetHandler = function (e) {
    const tokenLocalStorage = window.localStorage.getItem("THRIVEGLOBAL_STATE");
    window.ReactNativeWebView.postMessage(tokenLocalStorage);
  };
  document.addEventListener("itemInserted", localStorageSetHandler, false);
  
  true; // note: this is required, or you'll sometimes get silent failures
})();`;
