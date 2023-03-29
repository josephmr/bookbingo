<script>
  let cells = Array.from({ length: 25 });
</script>

<h1>Bingo</h1>

<div class="container">
  {#each cells as _}
    <div class="cell" />
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-template-rows: repeat(5, auto);
    width: 500px;
    height: 500px;
    grid-gap: 10px;
  }

  .cell {
    border: 1px solid blue;
    border-radius: 5px;
  }
  .cell:before {
    content: '';
    display: block;
  }
</style>
