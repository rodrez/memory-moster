<script lang="ts">
  export let card: { name: string; img: string; flipped: boolean; matched: boolean };
  export let id: number;
  export let onClick: (id: number) => void;

  import CardBack from '$lib/assets/images/card-back.webp';
</script>

<div class="card" data-id={id} on:click={() => onClick(id)}>
  <div class="card-inner" class:flipped={card.flipped || card.matched} class:matched={card.matched}>
    <div class="card-front relative">
      <img src={card.img} alt={card.name} />
      <span
        class="absolute bottom-1 left-1/2 -translate-x-1/2 bg-slate-900/80 font-bold px-2 rounded uppercase text-xs"
      >
        {card.name}
      </span>
    </div>
    <div
      class="card-back"
      style="background-image: url({CardBack}); background-size: cover; background-color: white;"
    ></div>
  </div>
</div>

<style>
  .card {
    perspective: 1000px;
  }

  .card-inner {
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .flipped {
    transform: rotateY(180deg);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .card-front {
    transform: rotateY(180deg);
  }

  .matched {
    border: 2px solid green; /* Example style for matched cards */
    box-shadow: 0 0 10px green;
    opacity: 0.5;
    pointer-events: none;
    border-radius: 12px;
  }
</style>
