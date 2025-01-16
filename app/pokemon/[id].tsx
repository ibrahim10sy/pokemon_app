import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function Pokemon() {
    const params = useLocalSearchParams();
  return (
    <View
      style={styles.container}
    >
      <Text>Ma page Pokemon {params.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})