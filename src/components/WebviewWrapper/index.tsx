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

const initialRoute = "https://app.stag.thriveglobal.com";
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
  }
  return StyleSheet.create({
    container: {
      flex: 1,
      width: 420,
      height: 50,
      backgroundColor: props.route.includes("login")
        ? colors.purple
        : backgroundColorTheme,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    if (routes.some((substring) => route.includes(substring))) {
      setShowBottomNavigationBar(true);
    } else {
      setShowBottomNavigationBar(false);
    }
  }, [route]);

  const onMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    setReduxState(data);
  };
  return (
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
  );
};

export default WebviewWrapper;
