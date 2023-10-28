import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

function CloudinaryUploadWidget({ onURLChange }) {
  const [imageSelected, setImageSelected] = useState(null);

  function handleUploadSuccess(result) {
    const imageUrl = result.info.secure_url;
    if (onURLChange) {
      onURLChange(imageUrl);
    } else {
      console.warn(
        "Você precisa passar a prop onChange para o formulário de cadastro"
      );
    }
    console.log("Upload bem-sucedido. URL da imagem:", imageUrl);

    setImageSelected(imageUrl);
  }

  return (
    <div>
      {imageSelected && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>Imagem Selecionada:</label>
          <Image
            src={imageSelected}
            alt="Imagem Selecionada"
            width="35"
            height="25"
            style={{ borderRadius: "5px" }}
          />
        </div>
      )}
      <CldUploadWidget
        uploadPreset={process.env.localNEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }

          return (
            <button className="upload" onClick={handleOnClick}>
              Enviar imagem
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default CloudinaryUploadWidget;
