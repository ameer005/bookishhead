import { useFetchBooks } from "../hooks/api/book/useBook";
import Head from "next/head";
import BookList from "../components/Lists/books/BookList";
import BookCardSkeletonList from "../components/skeletons/BookCardSkeletonList";
import HeaderLink from "../components/ui/HeaderLink";

import BtnLink from "../components/ui/BtnLink";

const HomePage = () => {
  const {
    data: popularBooks,
    isLoading: popularBooksLoading,
    isSuccess: PopularBooksSuccess,
  } = useFetchBooks();

  return (
    <>
      <Head>
        <title>Recent updates | bookishHead</title>
      </Head>

      {/* Section most popular */}
      <section className="mb-8">
        {/* <Heading>All Time Popular</Heading> */}
        <HeaderLink heading={"All Time Popular"} link={"/books/popular"} />

        {/* for desktop */}
        <div className="2xl:hidden">
          {popularBooksLoading ? (
            <BookCardSkeletonList skeletonCount={5} />
          ) : (
            <BookList
              data={popularBooks?.data.books.slice(0, 5)}
              isLoading={popularBooksLoading}
              isSuccess={PopularBooksSuccess}
            />
          )}
        </div>

        {/* for big tabelts */}
        <div className="hidden 2xl:block lg:hidden sm:block">
          {popularBooksLoading ? (
            <BookCardSkeletonList skeletonCount={4} />
          ) : (
            <BookList
              data={popularBooks?.data.books.slice(0, 4)}
              isLoading={popularBooksLoading}
              isSuccess={PopularBooksSuccess}
              s
            />
          )}
        </div>

        {/* for mobile */}
        <div className="hidden lg:block sm:hidden">
          {popularBooksLoading ? (
            <BookCardSkeletonList skeletonCount={6} />
          ) : (
            <BookList
              data={popularBooks?.data.books.slice(0, 6)}
              isLoading={popularBooksLoading}
              isSuccess={PopularBooksSuccess}
              skeletonCount={5}
              s
            />
          )}
        </div>

        {/* <div className="flex justify-center mt-6">
          <BtnLink link={"/books/popular"} text={"Show All"} />
        </div> */}
      </section>

      {/* Section recommenations */}
      <section className="mb-8">
        {/* <Heading>Recommendations</Heading> */}
        <HeaderLink heading={"Recommendations"} link={"/books/popular"} />

        <div className="2xl:hidden">
          {popularBooksLoading ? (
            <BookCardSkeletonList skeletonCount={5} />
          ) : (
            <BookList
              data={popularBooks?.data.books.slice(8, 13)}
              isLoading={popularBooksLoading}
              isSuccess={PopularBooksSuccess}
            />
          )}
        </div>

        {/* for big tabelts */}
        <div className="hidden 2xl:block lg:hidden sm:block">
          {popularBooksLoading ? (
            <BookCardSkeletonList skeletonCount={4} />
          ) : (
            <BookList
              data={popularBooks?.data.books.slice(8, 12)}
              isLoading={popularBooksLoading}
              isSuccess={PopularBooksSuccess}
              s
            />
          )}
        </div>

        {/* for mobile */}
        <div className="hidden lg:block sm:hidden">
          {popularBooksLoading ? (
            <BookCardSkeletonList skeletonCount={6} />
          ) : (
            <BookList
              data={popularBooks?.data.books.slice(8, 14)}
              isLoading={popularBooksLoading}
              isSuccess={PopularBooksSuccess}
              skeletonCount={5}
              s
            />
          )}
        </div>

        {/* <div className="flex justify-center mt-6">
          <BtnLink link={"/books/popular"} text={"Show All"} />
        </div> */}
      </section>
    </>
  );
};

export default HomePage;
