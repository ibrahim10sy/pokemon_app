import { View ,Text, StyleSheet} from "react-native";

export default function About() {
    return (
        <View
            style={styles.container}    // pour changer la couleur du background
        >
            <Text>Ma page A propos</Text>
        </View>
    );
}

const styles  = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    }
})