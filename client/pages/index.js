import { useFetchBooks } from "../hooks/api/book/useBook";
import Heading from "../components/ui/Heading";
import BookList from "../components/Lists/books/BookList";
import BookCardSkeletonList from "../components/skeletons/BookCardSkeletonList";

import BtnLink from "../components/ui/BtnLink";

const HomePage = () => {
  const {
    data: popularBooks,
    isLoading: popularBooksLoading,
    isSuccess: PopularBooksSuccess,
  } = useFetchBooks();

  return (
    <>
      {/* Section most popular */}
      <section className="mb-8">
        <Heading>All Time Popular</Heading>

        {popularBooksLoading ? (
          <BookCardSkeletonList skeletonCount={5} />
        ) : (
          <BookList
            data={popularBooks?.data.books.slice(0, 5)}
            isLoading={popularBooksLoading}
            isSuccess={PopularBooksSuccess}
            skeletonCount={5}
          />
        )}

        <div className="flex justify-center mt-6">
          <BtnLink link={"/books/popular"} text={"Show All"} />
        </div>
      </section>
      <section className="mb-8">
        <Heading>Recommendations</Heading>

        {popularBooksLoading ? (
          <BookCardSkeletonList skeletonCount={5} />
        ) : (
          <BookList
            data={popularBooks?.data.books.slice(8, 13)}
            isLoading={popularBooksLoading}
            isSuccess={PopularBooksSuccess}
            skeletonCount={5}
          />
        )}

        <div className="flex justify-center mt-6">
          <BtnLink link={"/books/popular"} text={"Show All"} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
