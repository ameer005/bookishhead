import { useFetchBooks } from "../hooks/api/book/useBook";

const HomePage = () => {
  const { data } = useFetchBooks();

  console.log(data);

  return (
    <>
      <div>this feels so good yes yes</div>
    </>
  );
};

export default HomePage;
