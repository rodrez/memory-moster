<script lang="ts">
  import { Confetti } from 'svelte-confetti';
  import { onMount } from 'svelte';
  import Card from './monster-card.svelte';
  import { playCardFlipSound, playCardMatchSound, playFanfare } from '$lib/sounds';
  import { allMonsterImages } from '$lib/monsters';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Congrats from '$lib/assets/images/congrats.webp';
  import PlayButton from '$lib/assets/images/play-button.webp';

  export let level = 4; // Default level
  let cardsChosen: any[] = [];
  let cardsChosenId: any[] = [];
  let cardsWon: any[] = [];
  let cardArray: any[] = [];
  let playerWon: boolean = false;

  function getRandomizedCardArray(level: number) {
    const numberOfPairs = level;
    const selectedImages = allMonsterImages.sort(() => 0.5 - Math.random()).slice(0, numberOfPairs);
    const cardArray: any[] = [];

    selectedImages.forEach((image) => {
      cardArray.push({ ...image, flipped: false, matched: false });
      cardArray.push({ ...image, flipped: false, matched: false });
    });

    return cardArray.sort(() => 0.5 - Math.random());
  }

  function createBoard(level: number) {
    cardArray = getRandomizedCardArray(level);
  }

  function flipCard(id: number) {
    console.log(`Card clicked: ${id}`); // Debug log
    playCardFlipSound();
    if (!cardsChosenId.includes(id) && !cardArray[id].flipped && !cardArray[id].matched) {
      cardArray[id].flipped = true;
      console.log(`Card flipped: ${id}`); // Debug log
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
      cardsWon.push(cardsChosen);
    } else {
      cardArray[optionOneId].flipped = false;
      cardArray[optionTwoId].flipped = false;
    }
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
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
    const playAgainEl = document.querySelector('#play-again-container') as HTMLElement;
    if (playAgainEl) {
      playAgainEl.style.display = 'none';
    }
    createBoard(level);
  }

  onMount(() => {
    createBoard(level);
  });
</script>

<div class="w-full flex flex-col items-center">
  <div id="game-board">
    {#each cardArray as card, index}
      <Card {card} id={index} onClick={flipCard} />
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

<AlertDialog.Root class="bg-slate-900/80">
  <AlertDialog.Trigger id="alert-modal"></AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title class="text-slate-900">You've Won!</AlertDialog.Title>
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

<style>
  /* Add your styles here */
</style>
