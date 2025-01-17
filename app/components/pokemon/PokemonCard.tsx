import { ViewStyle,Image, StyleSheet } from "react-native";
import Card from "../Card";
import ThemedText from "../ThemedText";
import { View } from "react-native";
import useThemeColors from "@/hooks/useThemeColors";

type Props = {
    style?: ViewStyle,
    id: number,
    name: string,
}

export default function PokemonCard({style, id, name} : Props){
    const colors = useThemeColors();
    return <Card style={[style, styles.card]}>
        {/* <View style={[styles.shadow, {backgroundColor:colors.grayBackground}]}></View> */}
        <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3,'0')}</ThemedText>
            <Image source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} 
                style={{width:72, height:72}} />
                <ThemedText variant="caption" color="grayMedium">{name}</ThemedText>
                <View style={[styles.shadow, {backgroundColor:colors.grayBackground}]}></View>
    </Card>
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding:4
    },
    id:{
        alignSelf:'flex-end'
    },
    shadow:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 7,
        height:44,
        zIndex: -1
    }
})