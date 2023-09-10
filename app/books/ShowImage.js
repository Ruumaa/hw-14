"use client"
import Swal from "sweetalert2";

const ShowImage = ({imageLink})=> {
    const handleShowImage = () => {
          Swal.fire({
            imageUrl: imageLink,
            background: "gray",
            imageAlt: "Book",
          });
        }
        return (
            <button onClick={handleShowImage} className="btn btn-sm btn-info">Show</button>
        )
}
export default ShowImage