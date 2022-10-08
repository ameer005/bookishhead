import BookCardSkeletonList from "../../components/skeletons/BookCardSkeletonList";
import {
  useFetchBooks,
  useFetchBooksInfinite,
} from "../../hooks/api/book/useBook";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import Heading from "../../components/ui/Heading";
import BookList from "../../components/Lists/books/BookList";

const Popular = () => {
  const {
    data: books,
    isLoading: booksLoading,
    isSuccess: booksSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchBooksInfinite();

  const lastItemRef = useInfiniteScroll({
    isLoading: booksLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const renderInfinitePages = () => {
    return books?.pages.map((page) => {
      return (
        <BookList
          key={page?.data.page}
          data={page?.data.books}
          isLoading={booksLoading}
          isSuccess={booksSuccess}
          skeletonCount={10}
        />
      );
    });
  };

  return (
    <div>
      <Heading>All Time Popular</Heading>
      {renderInfinitePages()}
      {(booksLoading || isFetchingNextPage) && (
        <BookCardSkeletonList skeletonCount={15} />
      )}
      <div ref={lastItemRef}></div>
    </div>
  );
};

export default Popular;
