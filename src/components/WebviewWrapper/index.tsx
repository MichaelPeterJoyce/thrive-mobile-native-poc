import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { ActivityIndicator, Divider, Stack } from "@react-native-material/core";
import BottomNavigationBar from "../Features/BottomNavigationBar";
import { colors } from "../../constants/colors";
import ThriveLogo from "../icons/ThriveLogo";
import { browserInjectionJavascript } from "../../utils/injected";
import { ReduxContext } from "../../utils/context";

const initialRoute = "https://app.thriveglobal.com";
const routes = ["today", "learn", "challenges", "reset", "profile"];

const WebViewStyle = (props) => {
  let backgroundColorTheme = "";
  switch (props.theme) {
    case "THRIVE":
      backgroundColorTheme = "transparent";
      break;
    case "HIGH_CONTRAST":
      backgroundColorTheme = "#111";
      break;
    default:
      backgroundColorTheme = "transparent";
  }
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: 50,
      backgroundColor: props.route.includes("login")
        ? colors.purple
        : backgroundColorTheme,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      marginBottom: Platform.OS === "android" ? 0 : 20,
    },
  });
};

const WebviewWrapper = () => {
  const webView = useRef<WebView>();
  const [route, setRoute] = useState(initialRoute);
  const [loading, setLoading] = useState(true);
  const stateChange = (event: WebViewNavigation) => setRoute(event.url);
  const [showBottomNavigationBar, setShowBottomNavigationBar] = useState(false);
  const [reduxState, setReduxState] = useState(null);
  const StyledContainer = WebViewStyle({
    route,
    theme: reduxState?.settings?.theme,
  }).container;

  useEffect(() => {
    const url = new URL(route);
    console.log(url.pathname)
    if (routes.some((substring) => url.pathname.includes(substring))) {
      setShowBottomNavigationBar(true);
    } else {
      setShowBottomNavigationBar(false);
    }
    if (url.pathname === "/app/UserHome") {
      setRoute(`${initialRoute}/login/callback`)
    }
  }, [route]);

  const onMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    setReduxState(data);
  };
  return (
    <ReduxContext.Provider value={reduxState}>
      <SafeAreaView style={StyledContainer}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading && (
            <Stack fill center spacing={8}>
              <ThriveLogo />
              <ActivityIndicator color={colors.teal} />
            </Stack>
          )}
          <WebView
            ref={webView}
            nestedScrollEnabled
            style={{ width: "100%", display: loading ? "none" : "flex" }}
            javaScriptEnabled={true}
            scrollEnabled={true}
            onLoadEnd={() => setLoading(false)}
            sharedCookiesEnabled={true}
            automaticallyAdjustContentInsets={true}
            allowFileAccess={true}
            scalesPageToFit={true}
            onLoadProgress={(event) => {
              if (Platform.OS === "android") {
                let { url } = event?.nativeEvent;
                setRoute(url);
              }
            }}
            onMessage={onMessage}
            allowsFullscreenVideo={true}
            injectedJavaScriptBeforeContentLoaded={browserInjectionJavascript}
            onNavigationStateChange={stateChange}
            source={{
              uri: route,
              headers: {
                X_THRIVE_CLIENT: `thrive-${Platform.OS}`,
              },
            }}
          />
        </ScrollView>
        <Divider />
        {showBottomNavigationBar && (
          <BottomNavigationBar webviewRef={webView} route={route} />
        )}
      </SafeAreaView>
    </ReduxContext.Provider>
  );
};

export default WebviewWrapper;
