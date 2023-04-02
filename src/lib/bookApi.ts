export async function search(query: string): Promise<BookInfo[]> {
  return await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(query)}`
  ).then((res) => res.json())
    .then(res => {
      return res.items?.map((book: any) => toBook(book)) ?? [];
    });
}

export interface BookInfo {
  authors: string[];
  title: string;
  images?: {
    thumbnail: string;
    smallThumbnail: string;
  };
}

// TODO: Consider runtime typing with io-ts
function toBook(book: any): BookInfo {
  console.log(book)
  const { volumeInfo } = book;
  const bookInfo: BookInfo = {
    authors: volumeInfo.authors ?? [],
    title: volumeInfo.title ?? '',
  };
  if (volumeInfo.imageLinks) {
    bookInfo.images = {
      thumbnail: volumeInfo.imageLinks.thumbnail,
      smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
    }
  }
  return bookInfo;
}
