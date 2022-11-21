import React, {useContext, useEffect, useState} from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { IconButton, Text } from "@react-native-material/core";
import TodayIcon from "../../icons/TodayIcon";
import ChallengesIcon from "../../icons/ChallengesIcon";
import LearnIcon from "../../icons/LearnIcon";
import ResetIcon from "../../icons/ResetIcon";
import { WebView } from "react-native-webview";
import { colors } from "../../../constants/colors";
import {ReduxContext} from "../../../utils/context";

const styles = StyleSheet.create({
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
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
  const reduxState = useContext<any>(ReduxContext);

  const [activeColor, setActiveColor] = useState(colors.purple)

  useEffect(() => {
    let color = ''
    switch (reduxState?.settings?.theme) {
      case "THRIVE":
        color = colors.purple;
        break;
      case "HIGH_CONTRAST":
        color = colors.white;
        break;
      default:
        color = colors.purple;
    }
    setActiveColor(color)
  }, [reduxState?.settings?.theme])

  const handlePress = (value: string) => {
    const injected = `window.handleNativeHandshake(${JSON.stringify({
      type: "NAVIGATE",
      value: `/${value.toLowerCase()}`,
    })})
    true; // note: this is required, or you'll sometimes get silent failures
    `;
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
                <ButtonIcon color={isActiveTab ? activeColor : colors.grey} />
              )}
            />
            <Text
              variant={"caption"}
              color={isActiveTab ? activeColor : colors.grey}
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
