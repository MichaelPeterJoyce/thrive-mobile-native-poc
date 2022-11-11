import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Text } from "@react-native-material/core";
import TodayIcon from "../../icons/TodayIcon";
import ChallengesIcon from "../../icons/ChallengesIcon";
import LearnIcon from "../../icons/LearnIcon";
import ResetIcon from "../../icons/ResetIcon";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
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

const tabs = [
  {
    name: "Today",
    icon: <TodayIcon />,
  },
  {
    name: "Challenges",
    icon: <ChallengesIcon />,
  },
  {
    name: "Learn",
    icon: <LearnIcon />,
  },
  {
    name: "Reset",
    icon: <ResetIcon />,
  },
];

interface BottomNavigationBarProps {
  webviewRef: React.MutableRefObject<WebView<{}>>;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  webviewRef,
}) => {
  const handlePress = (value: string) => {
    const injected = `window.handleNativeHandshake(${JSON.stringify({
      type: "NAVIGATE",
      value: `/${value.toLowerCase()}`,
    })})`;
    webviewRef.current.injectJavaScript(injected);
  };
  return (
    <View style={styles.bottomBar}>
      {tabs.map((tab) => (
        <View style={styles.button} key={tab.name}>
          <IconButton
            onPress={() => handlePress(tab.name)}
            icon={() => tab.icon}
          />
          <Text variant={"body2"}>{tab.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default BottomNavigationBar;
