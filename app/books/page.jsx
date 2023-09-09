import { PrismaClient } from "@prisma/client";
import AddBook from "./addBook";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";

const prisma = new PrismaClient();

const getBooks = async () => {
  try {
    const result = await prisma.book.findMany();
    return result;
  } catch (error) {
    console.error(error)
  }
};

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
                <td>{book.image}</td>
                <td className="flex justify-around">
                  <UpdateBook book={book}/>
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
