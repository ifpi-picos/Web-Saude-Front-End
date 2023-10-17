"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

function CloudinaryUploadWidget({ onURLChange }) {
  const [imageSelected, setImageSelected] = useState(false);

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

    setImageSelected(true); // Marca que uma imagem foi selecionada
  }

  return (
    <div>
      {imageSelected ? (
        <div>Imagem foi selecionada</div>
      ) : (
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
      )}
    </div>
  );
}

export default CloudinaryUploadWidget;
