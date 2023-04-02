import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { isAuthenticated } from '@/lib/authenticate'

import { useAtom } from "jotai"
import { searchHistoryAtom, favouritesAtom } from "@/store"
import { getFavourites, getHistory } from "@/lib/userData"

const PUBLIC_PATHS = ['/login', '/', '/_error','/register']

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false)

  const [ searchHistoryList, setSearchHistoryList ] = useAtom(searchHistoryAtom)
  const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom)

  useEffect(() => {
    updateAtoms()
    // on initial load - run auth check
    authCheck(router.pathname);
    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistoryList(await getHistory())
  }

  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && props.children}</>
}