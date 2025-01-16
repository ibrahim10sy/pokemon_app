import { StyleSheet, Text, View ,Image} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import  ThemedText  from "./components/ThemedText";
import  useThemeColors  from "@/hooks/useThemeColors";
import Card from "./components/Card";
import { Shadow } from "./constants/Shadow";
import { Colors } from "./constants/Colors";


export default function Index() {
  const colors = useThemeColors();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.tint }]}
    >
      <View style={styles.header}>
          <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
          <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
      </View>  
      <Card style={styles.body}>
        
      </Card>    

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ 
    // lineHeight:42,
    flex:1,
    padding:4
  },
  header:{
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
  padding: 12,
},
  body: {
  flex: 1,
  // backgroundColor: "#fff",
}
//   body: {
//   flex: 1,
//   borderRadius:8,
//     backgroundColor: Colors.light.grayLight,
//   // backgroundColor: "#fff",
// }
});
