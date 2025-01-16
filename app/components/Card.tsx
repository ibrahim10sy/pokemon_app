import { View, ViewProps, ViewStyle } from "react-native"
import { Shadow } from "../constants/Shadow"
import { Colors } from "../constants/Colors"
import useThemeColors from "@/hooks/useThemeColors";

type Props = ViewProps

export default function Card ({style, ...reset} : Props){
    const Colors = useThemeColors();
    return <View style={[style,styles, {backgroundColor: Colors.grayWhite}]} {...reset} /> 
}

const styles = {
    backgroundColor:'#fff',
    borderRadius:8,
    ...Shadow.dp2
} satisfies ViewStyle
