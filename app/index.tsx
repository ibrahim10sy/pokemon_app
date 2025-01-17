import { StyleSheet, Text, View ,Image, FlatList, ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  ThemedText  from "./components/ThemedText";
import  useThemeColors  from "@/hooks/useThemeColors";
import Card from "./components/Card";
import PokemonCard from "./components/pokemon/PokemonCard";
import { getPokemonId } from "./function/pokemons";
import { useInfiniteFecthQuery } from "@/hooks/useFetchQuery";


export default function Index() {
  const colors = useThemeColors();
  // const pokemons = [
  //   { id: 1, name: 'Bulbasaur' },
  //   { id: 2, name: 'Ivysaur' },
  //   { id: 3, name: 'Venusaur' },
  //   { id: 1, name: 'Bulbasaur' }, // Duplicate
  // ];
  // const {data, isFetching} = useFetchQuery('/pokemon?limit=21')
  const {data, isFetching, fetchNextPage} = useInfiniteFecthQuery('/pokemon?limit=21')
  const pokemons = data?.pages.flatMap(page => page.results) ?? []
  console.log(pokemons)
  
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
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap} 
        ListFooterComponent={
          isFetching ? <ActivityIndicator  color={colors.tint} /> : null
        }
        onEndReached={() => fetchNextPage()}
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


