import { View, type ViewProps, type ViewStyle } from "react-native"
import { Shadow } from "../constants/Shadow"
import useThemeColors from "@/hooks/useThemeColors";

type Props = ViewProps

export default function Card ({style, ...reset} : Props){
    const colors = useThemeColors();
    return <View style={[style,styles, {backgroundColor: colors.grayWhite}]} {...reset} /> 
}

const styles = {
    borderRadius:8,
    // ...Shadow.dp2
} satisfies ViewStyle
