import { PUBLIC_SCORE_API_URL } from '$env/static/public'

type League = {
  name: string | undefined
  conferences: string[]
}

export async function load({ fetch, params }) {
  const res = await fetch(
    `${PUBLIC_SCORE_API_URL}/${params.sport}/events/conferences`
  )

  if (!res.ok) console.error(await res.text())

  let leagues: League[] = await res.json()
  return {
    leagues,
  }
}
