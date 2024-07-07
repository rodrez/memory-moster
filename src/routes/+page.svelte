<script lang="ts">
  import GameBoard from '$lib/components/game-board.svelte';
  import MemoryMonster from '$lib/assets/memory-monster.png';
  import { levelStore } from '$lib/stores/levelStore';

  // Reactive subscription to the level store
  let level: number = 1;

  const levelsMapping: { [key: number]: number } = {
    4: 1,
    6: 2,
    8: 3,
    10: 4,
    12: 5,
    14: 6,
    16: 7,
    18: 8,
    20: 9
  };
  let currentLevel: number = levelsMapping[level];
  levelStore.subscribe((value) => {
    level = value;
    currentLevel = levelsMapping[level];
  });
</script>

<main>
  <div class="flex justify-center">
    <img
      src={MemoryMonster}
      class="md:w-3/12 -mt-24 md:m-0 aspect-auto mx-auto"
      alt="Memory Monster Game"
    />
  </div>
  <h2 class="text-4xl text-center font-semibold md:-mt-16 mb-8">
    Level
    <span class="text-amber-500"> {currentLevel} </span>
  </h2>
  <GameBoard />
</main>

<style>
  /* Add your styles here */
</style>
