import { StyleSheet, Text, View ,Image, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  ThemedText  from "./components/ThemedText";
import  useThemeColors  from "@/hooks/useThemeColors";
import Card from "./components/Card";
import PokemonCard from "./components/pokemon/PokemonCard";
import useFetchQuery from "@/hooks/useFetchQuery";
import { getPokemonId } from "./function/pokemons";


export default function Index() {
  const colors = useThemeColors();
  // const pokemons = [
  //   { id: 1, name: 'Bulbasaur' },
  //   { id: 2, name: 'Ivysaur' },
  //   { id: 3, name: 'Venusaur' },
  //   { id: 1, name: 'Bulbasaur' }, // Duplicate
  // ];
  const {data} = useFetchQuery('/pokemon?limit=21')
  const pokemons = data?.results ?? [];
  // console.log(pokemons)
  
  
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.tint }]}
    >
      <View style={styles.header}>
          <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
          <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
      </View>  
      <Card style={styles.body}>
      <FlatList 
        data={pokemons}
        numColumns={3}
        columnWrapperStyle={styles.gridGap} 
        contentContainerStyle={[styles.gridGap, styles.list]}  // add padding for grid gap
        renderItem={({item}) => 
        <PokemonCard id={getPokemonId(item.url)} name={item.name} style={{flex:1/3}} />
        } keyExtractor={(item) => item.url}
      />
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
},
gridGap:{
  gap: 8,
},
list :{
  padding: 16,
}
});


