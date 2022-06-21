import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Avatar from "../Avatar";
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
  leftAvatar?: any;
}

const Card = ({
  leftIconSrc,
  rightIconSrc,
  title,
  subtitle,
  leftAvatar,
  onPress,
  style = {},
}: ICardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        {leftAvatar && (
          <Avatar
            isUploaded={true}
            iconSource={leftAvatar}
            style={{
              container: [style.avatarContainer],
              imgContainer: style.avatarImageContainer,
            }}
          />
        )}
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
            title: style.title,
            subtitle: style.subtitle,
            container: style.textContainer,
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
};

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
    right: 20,
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rightIconImage: {
    height: 20,
    width: 15,
  },
});
