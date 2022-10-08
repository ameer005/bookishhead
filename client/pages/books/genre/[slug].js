import { useRouter } from "next/router";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import BookCardSkeletonList from "../../../components/skeletons/BookCardSkeletonList";
import BookList from "../../../components/Lists/books/BookList";
import { useFetchBooksInfinite } from "../../../hooks/api/book/useBook";
import Heading from "../../../components/ui/Heading";

const GenrePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: books,
    isLoading: booksLoading,
    isSuccess: booksSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchBooksInfinite({
    "genres.name": slug,
  });

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
      <Heading>{slug}</Heading>
      {renderInfinitePages()}
      {(booksLoading || isFetchingNextPage) && (
        <BookCardSkeletonList skeletonCount={15} />
      )}
      <div ref={lastItemRef}></div>
    </div>
  );
};

export default GenrePage;
