import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { LayoutServerLoad } from './$types'

type League = {
  name: string | undefined
  conferences: string[]
}

export let load: LayoutServerLoad = async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_SCORE_API_URL}/ncaab/events/conferences`)

  if (!res.ok) console.error(await res.text())

  let leagues: League[] = await res.json()
  return {
    leagues
  }
}
