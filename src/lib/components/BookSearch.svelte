<script lang="ts">
  import type { BookInfo } from "$lib/bookApi";
  import { search } from "$lib/bookApi";
  import fallbackImg from "$lib/images/missing_cover.jpg";
  import { debounce } from "lodash";

  let query = "";
  let results: BookInfo[] = [];

  const handleChange = debounce(async () => {
    const q = query;
    if (q.length < 3) {
      results = [];
      return;
    }

    const books = await search(q);
    if (q === query) {
      results = books;
    }
  }, 200);
</script>

<div class="container">
  <input bind:value={query} on:input={handleChange} />
  <ul>
    {#each results as result}
      <li>
        <img
          class="cover"
          src={result.images?.smallThumbnail || fallbackImg}
          alt="Book cover art"
        />
        <div>
          <div class="title">
            {result.title}
          </div>
          <div class="author">
            {result.authors?.join(", ") || ""}
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
    outline: none;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #d1d1d1;
    font-size: 18px;
  }
  ul {
    flex: 1;
    padding: 0;
    margin: 0;
    border: 1px solid #d1d1d1;
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 320px;
    overflow: scroll;
  }
  li {
    padding: 4px;
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  li:hover {
    background-color: #f5f5f5;
  }
  .cover {
    object-fit: contain;
    height: 72px;
  }
  .title {
    font-size: 18px;
  }
  .author {
    font-size: 12px;
    color: var(--secondary-text-color);
  }
</style>
