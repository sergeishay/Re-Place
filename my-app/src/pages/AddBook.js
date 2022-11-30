import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../utils/utils";

const AddBook = () => {

  const navigate = useNavigate();

  const [book, setBook] = useState({ });

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!book.imageName) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(book.imageName);
  }, [book])

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setBook(() => ({ ...book, imageName: pickedFile }))
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
  
    formData.append('name', book.Name)
    formData.append('image',file)

    await utils.addBook(formData);
    navigate("/");
  }

  return (
    <div>
      <div>
        <h3>Add a New Book</h3>
        Name:{" "}
        <input
          type="text"
          onChange={(e) => { setBook({ ...book, Name: e.target.value }) }}
          name="name"
          className="title_name"
        // id="imgInp"
        />
      </div>

      <div>
        Image:{" "}
        <div className="form-control">
          <input
            id="image"
            ref={filePickerRef}
            style={{ display: 'none' }}
            type="file"
            name="image"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
          />
          <div className={`image-upload 'center'}`}>
            <div className="image-upload__preview">
              {previewUrl && <img style={{ width: "600px", height: "400px"}} src={previewUrl} alt="Preview" />}
              {!previewUrl && <p>Please pick an image.</p>}
            </div>
            <input type="button" onClick={pickImageHandler} value="Uplaod an Image" />
          </div>
          {isValid ? null : 'No photo or Invalid mime type!'}
        </div>
      </div>

      <input type="button" value="Add Book" className="btn" onClick={handleSubmit} />

      <input
        type="button"
        value="Cancel"
        className="btn"
        onClick={() => navigate("/")}
      />

    </div>
  )
}
export default AddBook;