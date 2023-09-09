"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function AddBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // let formData = new FormData();
      // formData.append("title", title);
      // formData.append("author", author);
      // formData.append("publisher", publisher);
      // formData.append("year", year);
      // formData.append("pages", pages);
      // formData.append("image", image);

      // await axios.post("/api/books", formData)
      
      await axios.post("/api/books", {
        title,
        author,
        publisher,
        year: Number(year),
        pages: Number(pages),
        image,
      });
      setTitle("");
      setAuthor("");
      setPublisher("");
      setYear("");
      setPages("");
      setImage("");
      Swal.fire({
        icon: "success",
        title: "Create Book Success",
        text: "Book created sucessfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error(error)
    }
  }
    //kirim data yg sudah diinput
    return (
      <div>
        {/* ketika di klik handleModal dipanggil membuat nilai */}
        <button className="btn btn-md btn-success" onClick={handleModal}>
          Add New Book
        </button>
        {/* state jika modal open dan close , {condition ? true : false } */}
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center mb-5">Add New Book</h3>
            <form onSubmit={handleSubmit}>
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
                  // value={image}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={handleModal}>
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
export default AddBook;
