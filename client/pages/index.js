import { useFetchBooks } from "../hooks/api/book/useBook";
import HeaderLink from "../components/ui/HeaderLink";
import BookList from "../components/Lists/books/BookList";

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
      <section className="">
        <h3 className="text-base font-bold uppercase mb-3">All Time Popular</h3>
        <BookList
          data={popularBooks?.data.books}
          isLoading={popularBooksLoading}
          isSuccess={PopularBooksSuccess}
        />

        <div className="flex justify-center mt-6">
          <BtnLink link={"/books/popular"} text={"Show All"} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
