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

<style></style>
