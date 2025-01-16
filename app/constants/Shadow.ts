import { ViewStyle } from "react-native";

export const Shadow = {
    dp2: {
        width: 0,
        height: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    }
} satisfies Record<string, ViewStyle >