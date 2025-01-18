import useThemeColors from "@/hooks/useThemeColors";
import { SafeAreaView, ViewProps, ViewStyle } from "react-native";


type Props = ViewProps

export function RouteView({style, ...rest}:Props){
    const colors = useThemeColors();
    return <SafeAreaView 
    style={[rootStyle, {backgroundColor: colors.tint}, style]}
    { ...rest}
    />
}

const rootStyle = {
    flex:1,
    padding:4
}satisfies ViewStyle;