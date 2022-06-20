import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Icon from "../Icon";
import Info from "../Info";

/**
 * @author  vicky@
 * @description This is a component for the implementation of card.
 */

interface ICardProps {
  title?: string | null;
  subtitle?: string | null;
  leftIconSrc?: any;
  rightIconSrc?: any;
  isSelected?: boolean;
  onPress?: (e: any) => void;
  style?: any; // Overriding options for styling.
}

const Card = ({
  leftIconSrc,
  rightIconSrc,
  title,
  subtitle,
  isSelected,
  onPress,
  style = {},
}: ICardProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.container, style]}>
      {leftIconSrc && (
        <Icon
          src={leftIconSrc}
          style={{
            container: styles.leftIconContainer,
          }}
        />
      )}
      <Info
        title={title}
        subtitle={subtitle}
        style={{
          title: isSelected ? style.selectedTitle : style.title,
          subtitle: style.subtitle,
        }}
      />
      {rightIconSrc && (
        <Icon
          src={rightIconSrc}
          style={{
            container: styles.rightIconContainer,
            image: { width: 15, height: 15 },
          }}
        />
      )}
    </View>
  </TouchableOpacity>
);

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    position: "relative",
  },

  leftIconContainer: {
    paddingVertical: 5,
  },
  rightIconContainer: {
    position: "absolute",
    right: 30,
    top: 25,
    justifyContent: "center",
  },
  rightIconImage: {
    height: 20,
    width: 15,
  },
});
