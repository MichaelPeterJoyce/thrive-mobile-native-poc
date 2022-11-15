import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Text } from "@react-native-material/core";
import TodayIcon from "../../icons/TodayIcon";
import ChallengesIcon from "../../icons/ChallengesIcon";
import LearnIcon from "../../icons/LearnIcon";
import ResetIcon from "../../icons/ResetIcon";
import { WebView } from "react-native-webview";
import { colors } from "../../../constants/colors";

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

interface BottomNavigationBarProps {
  webviewRef: React.MutableRefObject<WebView<{}>>;
  route: string;
}

const tabs = [
  {
    name: "Today",
    icon: TodayIcon,
  },
  {
    name: "Challenges",
    icon: ChallengesIcon,
  },
  {
    name: "Learn",
    icon: LearnIcon,
  },
  {
    name: "Reset",
    icon: ResetIcon,
  },
];

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  webviewRef,
  route,
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
      {tabs.map((tab) => {
        // Creating new component so we can pass props
        const ButtonIcon = tab.icon;
        const isActiveTab = route.includes(tab.name.toLowerCase());
        return (
          <View style={styles.button} key={tab.name}>
            <IconButton
              onPress={() => handlePress(tab.name)}
              icon={() => (
                <ButtonIcon color={isActiveTab ? colors.purple : colors.grey} />
              )}
            />
            <Text
              variant={"caption"}
              color={isActiveTab ? colors.purple : colors.grey}
            >
              {tab.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default React.memo(BottomNavigationBar);
