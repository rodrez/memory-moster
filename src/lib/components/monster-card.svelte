<script>
  export let card;
  export let id;
  export let onClick;

  import CardBack from '$lib/assets/images/card-back.webp';
</script>

<div class="card" data-id={id} on:click={() => onClick(id)}>
  <div class:flipped={card.flipped} class:matched={card.matched} class="card-inner">
    <div class="card-front">
      <img src={card.img} alt={card.name} />
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
</style>
