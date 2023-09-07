import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import { error } from '@sveltejs/kit'

type League = {
  name: string | undefined
  conferences: string[]
}

export async function load({ fetch, params }) {
  console.log(`${PUBLIC_SCORE_API_URL}/${params.sport}/events/conferences`)
  const res = await fetch(
    `${PUBLIC_SCORE_API_URL}/${params.sport}/events/conferences`
  )

  if (!res.ok) {
    console.error(`from: ${import.meta.url}`, await res.json())
    throw error(res.status)
  }

  let leagues: League[] = await res.json()
  return {
    leagues,
  }
}
