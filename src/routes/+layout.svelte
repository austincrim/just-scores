<script>
  import { page } from '$app/stores'
  import Logo from '$lib/components/Logo.svelte'
  import '../app.css'

  $: route = $page.url.pathname
</script>

<header class="flex items-center justify-center gap-4 px-4 mt-8 text-xl">
  <a href="/" class="text-6xl !no-underline">
    <Logo type="initial" />
  </a>
</header>
<div class="max-w-xl pb-24 mx-auto">
  <slot />
</div>
<nav
  class="fixed bottom-0 grid w-full grid-cols-3 px-6 pt-6 border-y bg-emerald-200/50 backdrop-blur"
>
  <a class="text-center" class:active={route.includes('/nfl')} href="/nfl">
    NFL
  </a>
  <a class="text-center" class:active={route.includes('/ncaaf')} href="/ncaaf">
    NCAA FB
  </a>
  <a class="text-center" class:active={route.includes('/ncaab')} href="/ncaab">
    NCAA BB
  </a>
</nav>

<style>
  nav {
    padding-bottom: max(env(safe-area-inset-bottom), 1.5rem);
  }
  .active {
    font-weight: theme('fontWeight.bold');
  }
</style>
