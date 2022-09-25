import { useFetchBooks } from "../hooks/api/book/useBook";
import HeaderLink from "../components/ui/HeaderLink";
import BookList from "../components/Lists/books/BookList";

const HomePage = () => {
  const {
    data: popularBooks,
    isLoading: popularBooksLoading,
    isSuccess: PopularBooksSuccess,
  } = useFetchBooks();

  return (
    <>
      {/* Section most popular */}
      <section>
        <HeaderLink heading={"ALL TIME POPULAR"} link={"/books/popular"} />
        <BookList
          data={popularBooks?.data.books}
          isLoading={popularBooksLoading}
          isSuccess={PopularBooksSuccess}
        />
      </section>
    </>
  );
};

export default HomePage;
