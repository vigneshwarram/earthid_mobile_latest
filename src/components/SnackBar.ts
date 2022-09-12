import Snackbar from "react-native-snackbar";
import { Screens } from "../themes";
export interface ISnackbarProps {
  actionMessage?: string;
  duration?: number;
  indicationMessage?: string;
}
export const SnackBar = ({
  actionMessage = "",
  indicationMessage = "",
  duration = 3000,
}: ISnackbarProps) => {
  Snackbar.show({
    text: indicationMessage,
    duration: duration,
    action: {
      text: actionMessage,
      textColor: Screens.pureWhite,
      onPress: () => {
        /* Do something. */
      },
    },
  });
};
