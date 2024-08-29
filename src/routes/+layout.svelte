<script lang="ts">
  import "../app.css"
  import { navigating, page } from "$app/stores"
  import Logo from "$lib/components/Logo.svelte"

  $: route = $page.url.pathname
</script>

<header class="relative flex flex-col items-center justify-center px-4 mt-8">
  <a href="/" class="text-5xl !no-underline" class:animate-pulse={$navigating}>
    <Logo type="initial" />
  </a>
</header>
<div class="max-w-xl pb-24 mx-auto">
  <slot />
</div>
<nav
  class="fixed grid w-[min(95vw,400px)] grid-cols-3 gap-8 px-6 py-3 text-xl -translate-x-1/2 border shadow-brutal bottom-4 left-1/2 bg-stone-50/80 text-stone-900 backdrop-blur"
>
  <a
    class="text-center !no-underline whitespace-nowrap"
    class:active-nav={route.includes("/nfl")}
    href="/nfl"
  >
    NFL
  </a>
  <a
    class="text-center !no-underline whitespace-nowrap"
    class:active-nav={route.includes("/ncaaf")}
    href="/ncaaf?c=Top+25"
  >
    NCAA FB
  </a>
  <a
    class="text-center !no-underline whitespace-nowrap"
    class:active-nav={route.includes("/ncaab")}
    href="/ncaab?c=Top+25"
  >
    NCAA BB
  </a>
</nav>

<style>
  .active-nav {
    font-weight: bold;
  }
</style>
