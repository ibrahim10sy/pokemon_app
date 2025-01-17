import { View, ViewProps, ViewStyle } from "react-native";


type Props = ViewProps & {
    gap? : number;
}

export function Row({gap, style, ...rest} : Props){
    return (
        <View style={[style,rowStyle, gap ? {gap:gap}: undefined]} {...rest} />
    );
}

const rowStyle = {
    flexDirection: 'row',
    alignItems: 'center'
} satisfies ViewStyle