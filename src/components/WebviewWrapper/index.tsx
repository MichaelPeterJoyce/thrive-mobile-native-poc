import React, { useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { Divider, IconButton, Text } from "@react-native-material/core";
import TodayIcon from "../icons/TodayIcon";
import ChallengesIcon from "../icons/ChallengesIcon";
import LearnIcon from "../icons/LearnIcon";
import ResetIcon from "../icons/ResetIcon";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 420,
    height: 50,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 50,
    marginRight: 50,
    marginBottom: Platform.OS === "android" ? StatusBar.currentHeight - 10 : 0,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const WebviewWrapper = () => {
  const webView = useRef<any>();

  const initialRoute = "http://localhost:3000";
  const [route, setRoute] = useState(initialRoute);
  let navigateHandler = () => {
    console.log("navigate");
  };
  const runFirst = `
      window.isRunningInWebView = true
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  let handlePress = (value: string) => {
    const injected = `window.handleNativeHandshake(${JSON.stringify({
      type: "NAVIGATE",
      value: `/${value}`,
    })})`;
    console.log(injected);
    webView.current.injectJavaScript(injected);
  };

  function stateChange(event: any) {
    console.log(event);
    setRoute(event.url);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WebView
          ref={webView}
          nestedScrollEnabled
          style={{ width: "100%" }}
          javaScriptEnabled={true}
          scrollEnabled={true}
          allowsFullscreenVideo={true}
          injectedJavaScriptBeforeContentLoaded={runFirst}
          onNavigationStateChange={stateChange}
          onMessage={(event) => {
            alert(event.nativeEvent.data);
          }}
          source={{
            uri: route,
            headers: {
              X_THRIVE_CLIENT: "thrive-ios",
            },
          }}
        />
      </ScrollView>
      <Divider />
      {!route.includes("login") && (
        <View style={styles.bottomBar}>
          <View style={styles.button}>
            <IconButton
              onPress={() => handlePress("today")}
              icon={(props) => <TodayIcon />}
            />
            <Text variant={"body2"}>Today</Text>
          </View>
          <View style={styles.button}>
            <IconButton
              onPress={() => handlePress("challenges")}
              icon={(props) => <ChallengesIcon />}
            />
            <Text variant={"body2"}>Challenges</Text>
          </View>

          <View style={styles.button}>
            <IconButton
              onPress={() => handlePress("learn")}
              icon={(props) => <LearnIcon />}
            />
            <Text variant={"body2"}>Learn</Text>
          </View>
          <View style={styles.button}>
            <IconButton
              onPress={() => handlePress("reset")}
              icon={(props) => <ResetIcon />}
            />
            <Text variant={"body2"}>Reset</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WebviewWrapper;
