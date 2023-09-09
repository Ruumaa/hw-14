"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function DeleteBook({ book }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (bookId) => {
    await axios.delete(`/api/books/${bookId}`);
    Swal.fire({
      icon: "success",
      title: "Delete Book Success",
      text: "Book deleted sucessfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn btn-sm btn-error" onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-5">
            Are you sure to delete {book.title}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => handleDelete(book.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
