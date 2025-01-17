import { StyleSheet ,Image, FlatList, ActivityIndicator} from "react-native";
import  ThemedText  from "./components/ThemedText";
import  useThemeColors  from "@/hooks/useThemeColors";
import Card from "./components/Card";
import PokemonCard from "./components/pokemon/PokemonCard";
import { getPokemonId } from "./function/pokemons";
import { useInfiniteFecthQuery } from "@/hooks/useFetchQuery";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { Row } from "./components/Row";
import { SortButton } from "./components/SortButton";
import { RouteView } from "./components/RouteView";


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
  const pokemons = data?.pages.flatMap(page => page.results.map(r => ({name:r.name, id:getPokemonId(r.url)}))) ?? []
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'id' | 'name'>('id')
  const filteredPokemon = [
    ...(search ? 
      pokemons.filter(p => p.name.includes(search.toLowerCase()) ||
      p.id.toString() === search)
      : pokemons
    )
  ].sort((a,b) => (a[sortKey] < b[sortKey] ? -1 : 1))
  console.log(pokemons)
  
  return (
    <RouteView
      
    >
      <Row style={styles.header} gap={16}>
          <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
          <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
          {/* <Image  source={require("@/assets/images/pokeball.png")} width={24} height={24}/> */}
      </Row>  
      <Row gap={16} style={{paddingHorizontal:12}}>
        <SearchBar value={search} onChange={setSearch}></SearchBar>
        <SortButton value={sortKey} onChange={setSortKey}></SortButton>
      </Row>
      <Card style={styles.body}>  
      <FlatList 
        data={filteredPokemon}
        numColumns={3}
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap} 
        ListFooterComponent={
          isFetching ? <ActivityIndicator  color={colors.tint} /> : null
        }
        onEndReached={search ? undefined : () => fetchNextPage()}
        renderItem={({item}) => 
        <PokemonCard id={item.id} name={item.name} style={{flex:1/3}} />
        } keyExtractor={(item) => item.id.toString()}
      />
      </Card>    

    </RouteView>
  );
}

const styles = StyleSheet.create({

  header:{
  paddingHorizontal: 12,
  paddingBottom: 8,
  paddingVertical: 12,
},
  body: {
  flex: 1,
  marginTop: 16
},
gridGap:{
  gap: 8,
},
list :{
  padding: 16,
}
});


