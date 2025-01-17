import { ViewStyle,Image, StyleSheet, Pressable } from "react-native";
import Card from "../Card";
import ThemedText from "../ThemedText";
import { View } from "react-native";
import useThemeColors from "@/hooks/useThemeColors";
import { Link } from "expo-router";

type Props = {
    style?: ViewStyle,
    id: number,
    name: string,
}

export default function PokemonCard({style, id, name} : Props){
    const colors = useThemeColors();
    return <Link href={{pathname:"/pokemon/[id]", params:{id:id}}}  asChild >
        <Pressable android_ripple={{color:colors.tint, foreground:true}}  style={style}>
        <Card style={[ styles.card]}>
        
        <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3,'0')}</ThemedText>
            <Image source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} 
                style={{width:72, height:72}} />
                <ThemedText variant="caption" color="grayMedium">{name}</ThemedText>
                <View style={[styles.shadow, {backgroundColor:colors.grayBackground}]}></View>
    </Card>
        </Pressable>
        </Link>
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding:4,
        borderWidth: 0.1,
        borderStyle: 'solid',
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