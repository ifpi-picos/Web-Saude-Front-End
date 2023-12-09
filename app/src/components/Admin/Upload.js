import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import styles from "@/components/Admin/Formularios/css/Form.module.css";
import Image from "next/image";

function CloudinaryUploadWidget({ onURLChange, defaultImage }) {
  const [imageSelected, setImageSelected] = useState(defaultImage || "");

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
        options={{
          clientAllowedFormats: ["png", "jpg", "jpeg", "gif", "svg"],
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }

          return (
            <button
              className={styles.upload}
              type="button"
              onClick={handleOnClick}
            >
              Enviar imagem
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default CloudinaryUploadWidget;
