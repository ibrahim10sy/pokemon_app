export function getPokemonId (url:string): number {
    return parseInt(url.split('/').at(-2)!, 10);
}

export function getPokemonImage(id: number | string):string {
    return  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatedWeight(weight: number ):string {
    if(!weight) return '0 kg'
    return (weight / 10).toString().replace('.', ',') + ' kg'
}

export function formatedSize(size: number ):string {
    if(!size) return ''
    return (size / 10).toString().replace('.', ',') + ' m'
}
