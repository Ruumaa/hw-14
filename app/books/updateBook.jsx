"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function UpdateBook({ book }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publisher, setPublisher] = useState(book.publisher);
  const [year, setYear] = useState(book.year);
  const [pages, setPages] = useState(book.pages);
  const [image, setImage] = useState("");

  const router = useRouter();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    //kirim data yg sudah diinput
    await axios.patch(`/api/books/${book.id}`, {
      title,
      author,
      publisher,
      year: Number(year),
      pages: Number(pages),
      image,
    });
    Swal.fire({
      icon: "success",
      title: "Update Book Success",
      text: "Book updated sucessfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      {/* ketika di klik handleModal dipanggil membuat nilai */}
      <button className="btn btn-sm btn-info" onClick={handleModal}>
        Edit
      </button>
      {/* state jika modal open dan close , {condition ? true : false } */}
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-5">Update {book.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="Book's Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Author</label>
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="Book's writter"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Publisher</label>
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="Book's Publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Year</label>
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="When the book published"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Pages</label>
              <input
                type="text"
                required
                className="input input-bordered"
                placeholder="How many book pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Images</label>
              <input
                type="file"
                className="input input-bordered"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
