import { Colors } from '@/app/constants/Colors';
import { useInfiniteQuery, useQuery, } from '@tanstack/react-query';

const endpoint=  "https://pokeapi.co/api/v2"

type API = {
  '/pokemon?limit=21': {
    count: number;
    next: string;
    previous: string;
    results: { name: string; url: string }[];
  };
  '/pokemon/[id]': {
    id: number;
    name: string;
    url:string,
    weight: number;
    height: number;
    moves:{move:{name:string}} [];
    stats : {
      base_stat : number;
      stat: {name:string}
    };
  }[];
  cries: {
    latest:string;
  };
  types:{
    type: {
      name: keyof typeof Colors['type']
    }[];
    
  };
};

export default function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
  const localUrl = 
    endpoint + 
    Object.entries(params ?? {}).reduce(
      (acc , [key, value]) => acc.replaceAll(`[${key}]`, value),
      path,
    );
    return useQuery({
      queryKey: [localUrl],
      queryFn: async () => {
        await wait(1); 
        const response = await fetch(localUrl);
        return response.json(); 
      },
    });
}

  export  function useInfiniteFecth(path: string) {
    return useInfiniteQuery({
      queryKey: [path],
      initialPageParam: path,
      queryFn: async ({ pageParam }) => {
        // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating a wait
        const response = await fetch(pageParam, {
          headers: {
            Accept: 'application/json',
          },
        });
        return response.json();
      },
      getNextPageParam: (lastPage) => {
        if ("next" in lastPage) {
          return lastPage.next;
        }
        return null;
      },
    });
  }

  export function useInfiniteFecthQuery<T extends keyof API>(path: T, params?: Record<string, string | number>){
    

    return useInfiniteQuery({
      queryKey: [path],
      initialPageParam: endpoint + path,
      queryFn: async({pageParam}) => {
        await wait(1)
        return fetch(pageParam, {
          headers: {
            Accept: 'application/json',
          },
        }).then(r => r.json() as Promise<API[T]>)
      },
      getNextPageParam: (lastPage) => {
        if ('next' in lastPage) {
          return lastPage.next
        }
        return null;
      }
    })
  }

function wait (duration: number) {
    return new Promise(resolve => setTimeout(resolve, duration * 1000));
}