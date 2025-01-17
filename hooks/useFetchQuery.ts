import { useInfiniteQuery, useQuery, } from '@tanstack/react-query';

const endpoint=  "https://pokeapi.co/api/v2"

type API = {
  '/pokemon?limit=21': {
    count: number;
    next: string;
    previous: string;
    results: { name: string; url: string }[];
  }
}

export default function useFetchQuery(path : string) {
    return useQuery({
      queryKey: [path],
      queryFn: async () => {
        await wait(1); 
        const response = await fetch(endpoint + path);
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

  export function useInfiniteFecthQuery<T extends keyof API>(path: T){
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