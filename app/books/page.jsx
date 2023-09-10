import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";
import getBooks from "./getBooks";
import ShowImage from "./ShowImage.js";

const Books = async () => {
  const books = await getBooks();
  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Year</th>
            <th>Pages</th>
            <th>Image</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.year}</td>
                <td>{book.pages}</td>
                <td>
                  <ShowImage imageLink={book.image} />
                </td>
                <td className="flex justify-around">
                  <UpdateBook book={book} />
                  <DeleteBook book={book} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end mr-7 mt-3">
        <AddBook />
      </div>
    </div>
  );
};

export default Books;
