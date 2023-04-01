<script lang="ts">
  import { debounce } from "lodash";
  import fallbackImg from "$lib/images/missing_cover.jpg";

  let search = "";
  let results: any = [];

  const handleChange = debounce(async () => {
    const term = search;
    if (term.length < 3) {
      results = [];
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
<div class="container">
  <input bind:value={search} on:input={handleChange} />
  <ul>
    {#each results as result}
      <li>
        <img
          class="cover"
          src={result.volumeInfo.imageLinks?.smallThumbnail || fallbackImg}
          alt="Book cover art"
        />
        <div>
          <div class="title">
            {result.volumeInfo.title}
          </div>
          <div class="author">
            {result.volumeInfo.authors?.join(", ") || ""}
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .container {
    width: 320px;
    display: flex;
    flex-direction: column;
  }
  input {
    flex: 1;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #d1d1d1;
    background-color: white;
    font-size: 18px;
  }
  ul {
    flex: 1;
    padding: 0;
    margin: 0;
    border: 1px solid #d1d1d1;
    border-top: none;
    background-color: white;
    max-height: 320px;
    overflow: scroll;
  }
  li {
    padding: 4px;
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  li:hover {
    background-color: #f5f5f5;
  }
  .cover {
    max-height: 60px;
    width: 42px;
  }
  .title {
    font-size: 18px;
  }
  .author {
    font-size: 12px;
    color: #232323;
  }
</style>
