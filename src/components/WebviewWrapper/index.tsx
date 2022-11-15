import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import {
  ActivityIndicator,
  Divider,
  Stack,
  useStyles,
} from "@react-native-material/core";
import BottomNavigationBar from "../Features/BottomNavigationBar";
import { colors } from "../../constants/colors";
import ThriveLogo from "../icons/ThriveLogo";

const initialRoute = "https://app.stag.thriveglobal.com";
const runFirst = `
      window.isRunningInWebView = true
      true; // note: this is required, or you'll sometimes get silent failures
    `;

const routes = ["today", "learn", "challenges", "reset", "profile"];

const WebViewStyle = (props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: 420,
      height: 50,
      backgroundColor: props.route.includes("login")
        ? colors.purple
        : "transparent",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

const WebviewWrapper = () => {
  const webView = useRef<WebView>();
  const [route, setRoute] = useState(initialRoute);
  const [loading, setLoading] = useState(true);
  const stateChange = (event: WebViewNavigation) => setRoute(event.url);
  const [showBottomNavigationBar, setShowBottomNavigationBar] = useState(false);
  const StyledContainer = WebViewStyle({ route }).container;

  useEffect(() => {
    if (routes.some((substring) => route.includes(substring))) {
      setShowBottomNavigationBar(true);
    } else {
      setShowBottomNavigationBar(false);
    }
  }, [route]);

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
          allowsFullscreenVideo={true}
          injectedJavaScriptBeforeContentLoaded={runFirst}
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
