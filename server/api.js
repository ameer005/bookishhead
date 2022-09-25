const axios = require("axios").default;

const dummyData = async () => {
  const { data } = await axios.get("https://example-data.draftbit.com/books");

  data.forEach((book) => {
    let genres;

    if (book.genres) {
      genres = book.genres.split(", ").map((genre) => {
        return { name: genre };
      });
    } else {
      genres = genres;
    }

    const finalBook = {
      title: book.title,
      author: book.authors,
      summary: book.description,
      pages: book.num_pages,
      coverImg: book.image_url,
      genres,
    };

    axios.post("http://127.0.0.1:5000/api/v1/books", finalBook, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzIwYTdhZTEzMzdmZTVhMGI3OWQzYTAiLCJpYXQiOjE2NjQwMDYxNzYsImV4cCI6MTY2NDA5MjU3Nn0.Bo-BMcmKmfbiLfnBWdLO_EXA6qQwxBUF34Oz5sgVw0o",
      },
    });
  });
};

dummyData();
