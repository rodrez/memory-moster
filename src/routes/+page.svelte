<script>
  import GameBoard from '$lib/components/game-board.svelte';
  import MemoryMonster from '$lib/assets/memory-monster.png';
  let level = 1;
</script>

<main>
  <div>
    <img src={MemoryMonster} class="w-3/12 aspect-auto mx-auto" alt="Memory Monster Game" />
  </div>
  <h2 class="text-4xl text-center font-semibold -mt-16 mb-8">
    Level
    <span class="text-amber-500"> {level} </span>
  </h2>
  <GameBoard level={level * 4} />
</main>

<style>
  /* Add your styles here */
</style>
