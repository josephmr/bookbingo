<script lang="ts">
  import { debounce } from "lodash";

  let search = "";
  let results: any = [];

  const handleChange = debounce(async () => {
    const term = search;
    if (term.length < 3) {
      return;
    }
    const json = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(term)}`
    ).then((res) => res.json());
    if (term === search) {
      results = json.items;
    }
  }, 200);
</script>

<h1>Input</h1>
<input bind:value={search} on:input={handleChange} />
<ul>
  {#each results as result}
    <li>
      {result.volumeInfo.title}
    </li>
  {/each}
</ul>
