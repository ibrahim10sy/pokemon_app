import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RouteView } from "../components/RouteView";
import { Row } from "../components/Row";
import ThemedText from "../components/ThemedText";
import useFetchQuery from "@/hooks/useFetchQuery";


export default function Pokemon() {
  const params = useLocalSearchParams() as {id:string};
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', {id:params.id});
  console.log("Params : ",pokemon);
  return (
    <RouteView>
      <View>
      <Image style={styles.poke}
          source={require("@/assets/images/Pokebal.png")}
          width={208}
          height={208}
          />
      <Pressable onPress={router.back}>
      <Row style={styles.header}>
        <Row gap={8}>
          <Image
          source={require("@/assets/images/flech.png")}
          width={32}
          height={32}
          />
          <ThemedText variant="headline" color="grayWhite">{pokemon?.name}</ThemedText>
        </Row>
        <ThemedText variant="subtitle2" color="grayWhite">#{params.id.padStart(3, '0')}</ThemedText>
      </Row>
      </Pressable>
      </View>
    </RouteView>
  );
}

const styles = StyleSheet.create({
    header: {
      margin:20,
      justifyContent:"space-between"
    }, 
    poke:{opacity: .1,
      position:'absolute',
      top:8,
      right:8,
      
    }
})