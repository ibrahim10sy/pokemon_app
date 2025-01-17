import useThemeColors from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native"

type Props = {
    checked: boolean
}
export default function Radio({checked}: Props){
    const colors = useThemeColors();
    return <View style={[styles.checked, {borderColor: colors.tint}]}> 
        {checked &&  <View style={[styles.unchecked, {backgroundColor: colors.tint}]} />}
    </View>
    // return checked ? <View style={styles.checked} /> : <View style={styles.unchecked} />
}

const styles = StyleSheet.create({
    checked: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    unchecked: {
        
        width: 10,
        height: 10,
        borderRadius: 10,
    }
})