import prisma from "../lib/prisma";

const getBooks = async () => {
    try {
      const result = await prisma.book.findMany();
      return result;
    } catch (error) {
      console.error(error)
    }
  };
  export default getBooks