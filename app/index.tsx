import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";




export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.tint }]}
    >
      <Text  style={styles.headline}>Pokédex</Text>
      {/* <ThemedText variant="headline" color="grayWhite">Pokédex</ThemedText> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:3
  },
  headline: {
    fontSize:26,
    lineHeight:42,
    color:"#FFFFFF",
    fontWeight:"bold",
},
});
