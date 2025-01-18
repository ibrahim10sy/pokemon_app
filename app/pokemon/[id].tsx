import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { RouteView } from "../components/RouteView";
import { Row } from "../components/Row";
import ThemedText from "../components/ThemedText";
import useFetchQuery from "@/hooks/useFetchQuery";
import useThemeColors from "@/hooks/useThemeColors";
import { Colors } from "../constants/Colors";
import { formatedSize, formatedWeight, getPokemonImage } from "../function/pokemons";
import Card from "../components/Card";
import { PokemonType } from "../components/pokemon/pokemonType";
import { PokemonSpec } from "../components/pokemon/PokemonSpec";


export default function Pokemon() {
  const colors = useThemeColors();
  const params = useLocalSearchParams() as {id:string};
  const { data: pokemon } = useFetchQuery('/pokemon/[id]', {id:params.id});
  const mainType = pokemon?.types?.[0].type.name;
  const colorType = mainType ? Colors.type[mainType] : colors.grayWhite;
  const types = pokemon?.types ?? []
  return (
    <RouteView style={{backgroundColor: colorType}}>
      <View>
      <Image style={styles.poke}
          source={require("@/assets/images/Pokebal.png")}
          width={208}
          height={208}
          />
      <Row style={styles.header}>
        <Row gap={8}>
      <Pressable onPress={router.back}>
          <Image
          source={require("@/assets/images/flech.png")}
          width={32}
          height={32}
          />
        </Pressable>
          <ThemedText variant="headline" color="grayWhite" style={{textTransform:"capitalize"}}>{pokemon?.name}</ThemedText>
        </Row>
        <ThemedText variant="subtitle2" color="grayWhite">#{params.id.padStart(3, '0')}</ThemedText>
      </Row>
      <View style={styles.body}>
      <Image 
      source={{
      uri:getPokemonImage(params.id)}} 
      width={208}
      height={208}
      style={styles.artwork} 
      />

      <Card style={styles.card}>
        <Row gap={16} > 
          {
            types.map((t:any) => (
              <PokemonType name={t.type.name}  key={t.type.name} />
            ))
          }
        </Row>
        <ThemedText variant="subtitle1" style={{color:colorType}}>A propos</ThemedText>
        <Row>
          <PokemonSpec 
          style={{borderStyle:'solid',borderWidth:1,borderColor:colors.grayLight}}
          title={formatedWeight(pokemon?.weight)}
          description="Poids"
          image={require("@/assets/images/w.png")}
          />
          <PokemonSpec 
          style={{borderStyle:'solid',borderWidth:1,borderColor:colors.grayLight}}
          title={formatedSize(pokemon?.height)}
          description="Taille"
          image={require("@/assets/images/he.png")}
          />
          <PokemonSpec 
          title={pokemon?.moves
            .slice(0,2)
            .map((m:any) => m.move.name)
            .join("\n")
          }
          description="Mouv"
          />
        </Row>
        <ThemedText variant="subtitle1" style={{color:colorType}}>Etat de base</ThemedText>
      </Card>
      </View>
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
      
    },
    artwork : {
      alignSelf:"center",
      position:"absolute",
      top: -140,
      zIndex:2
    },
    body:{
      marginTop:150
    },
    card : {
      paddingHorizontal:20,
      paddingTop:16,
      alignItems:"center",
      padding:12,
      gap:16

    }
})