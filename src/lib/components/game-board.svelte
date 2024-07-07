<script lang="ts">
  import { Confetti } from 'svelte-confetti';
  import { onMount } from 'svelte';
  import Card from './monster-card.svelte';
  import { playCardFlipSound, playCardMatchSound, playFanfare } from '$lib/sounds';
  import { allMonsterImages } from '$lib/monsters';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Congrats from '$lib/assets/images/congrats.webp';
  import PlayButton from '$lib/assets/images/play-button.webp';
  import { levelStore, maxLevel, levelStep } from '$lib/stores/levelStore';
  import { get } from 'svelte/store';

  let level: number;
  let cardsChosen: any[] = [];
  let cardsChosenId: number[] = [];
  let cardsWon: any[] = [];
  let cardArray: any[] = [];
  let playerWon: boolean = false;

  const layouts = [
    {
      class: 'regular-board',
      cardCount: 8 // 2x4 grid
    },
    {
      class: 'arrow',
      cardCount: 10
    },
    {
      class: 'diamond',
      cardCount: 12
    },
    {
      class: 'deer',
      cardCount: 14
    },
    {
      class: 'stair',
      cardCount: 16
    },
    {
      class: 'anchor',
      cardCount: 18
    },
    {
      class: 'rocket',
      cardCount: 20
    }
  ];
  let currentLayout = layouts[Math.floor(Math.random() * layouts.length)];

  function getRandomizedCardArray(count: number) {
    const numberOfPairs = count / 2;
    const selectedImages = allMonsterImages.sort(() => 0.5 - Math.random()).slice(0, numberOfPairs);

    const cardArray: any[] = [];

    selectedImages.forEach((image) => {
      cardArray.push({ ...image, flipped: false, matched: false });
      cardArray.push({ ...image, flipped: false, matched: false });
    });

    return cardArray.sort(() => 0.5 - Math.random());
  }

  function createBoard(level: number) {
    currentLayout = layouts.find((layout) => layout.cardCount === level) || layouts[0];
    cardArray = getRandomizedCardArray(level);
  }

  function flipCard(id: number) {
    playCardFlipSound();
    if (!cardsChosenId.includes(id) && !cardArray[id].flipped && !cardArray[id].matched) {
      cardArray[id].flipped = true;
      cardsChosen.push(cardArray[id].name);
      cardsChosenId.push(id);

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function checkForMatch() {
    const [optionOneId, optionTwoId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      playCardMatchSound();
      cardArray[optionOneId].matched = true;
      cardArray[optionTwoId].matched = true;
    } else {
      cardArray[optionOneId].flipped = false;
      cardArray[optionTwoId].flipped = false;
    }
    cardsChosen = [];
    cardsChosenId = [];

    if (cardArray.every((card) => card.matched)) {
      const modelTrigger = document.getElementById('alert-modal');
      playerWon = true;
      modelTrigger?.click();
      playFanfare();
      setTimeout(() => {
        const playAgainEl = document.querySelector('#play-again-container') as HTMLElement;
        if (playAgainEl) {
          playAgainEl.style.display = 'block';
        }
      }, 500);
    }
  }

  function resetGame() {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    playerWon = false;
    const playAgainEl = document.querySelector('#play-again-container') as HTMLElement;
    if (playAgainEl) {
      playAgainEl.style.display = 'none';
    }

    levelStore.update((level) => {
      if (level < maxLevel) {
        return level + levelStep;
      } else {
        return 4; // Reset to the starting level if the max level is reached
      }
    });

    level = get(levelStore); // Update the local level variable
    createBoard(level);
  }

  onMount(() => {
    level = get(levelStore); // Initialize the level from the store
    createBoard(level);
  });
</script>

<div class="w-full flex flex-col items-center">
  <div id="game-board" class={currentLayout.class}>
    {#each cardArray as card, index}
      <Card {card} id={index} onClick={() => flipCard(index)} />
    {/each}
  </div>
</div>
{#if playerWon}
  <div
    style="
      position: fixed;
      top: -50px;
      left: 0;
      z-index: 51;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      overflow: hidden;
      pointer-events: none;"
  >
    <Confetti
      x={[-5, 5]}
      y={[0, 0.1]}
      delay={[500, 2000]}
      infinite
      duration="5000"
      amount="200"
      fallDistance="100vh"
    />
  </div>
{/if}

<AlertDialog.Root>
  <AlertDialog.Trigger id="alert-modal"></AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="">You've Won!</AlertDialog.Title>
      <AlertDialog.Description>
        <img src={Congrats} alt="Congratulations" />
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel
        class="p-0 w-28 bg-transparent hover:bg-transparent outline-none border-none"
        on:click={resetGame}
      >
        <img src={PlayButton} class="w-full h-full" alt="Play Again" />
      </AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
