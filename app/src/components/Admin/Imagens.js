import React, { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import styles from "@/components/Admin/Formularios/css/Form.module.css";
import Image from "next/image";
import { Carousel } from "react-bootstrap";

function Imagens({ onURLChange, defaultImages }) {
  const [imagesSelected, setImagesSelected] = useState(defaultImages || []);
  const imagesRef = useRef([]);

  function handleUploadSuccess(result) {
    const imageUrl = result.info.secure_url;

    if (!imagesRef.current.includes(imageUrl)) {
      imagesRef.current.push(imageUrl);
    }

    setImagesSelected([...imagesRef.current]);

    if (onURLChange) {
      onURLChange([...imagesRef.current]);
    } else {
      console.warn(
        "Você precisa passar a prop onChange para o formulário de cadastro"
      );
    }

    console.log("Upload bem-sucedido. URL da imagem:", imageUrl);
  }

  console.log("Images Selected:", imagesSelected);

  return (
    <div>
      <CldUploadWidget
        uploadPreset={process.env.localNEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
        options={{
          clientAllowedFormats: ["png", "jpg", "jpeg", "gif", "svg"],
          multiple: true,
        }}
      >
        {({ open }) => (
          <div>
            <button
              className={styles.upload}
              type="button"
              onClick={() => open()}
            >
              Selecionar Imagens
            </button>
          </div>
        )}
      </CldUploadWidget>

      {imagesSelected.length > 0 && (
        <div>
          <Carousel>
            {imagesSelected.map((imageUrl, index) => (
              <Carousel.Item key={index}>
                <div style={{ width: "100%", height: "300px" }}>
                  <Image
                    src={imageUrl}
                    alt={`Imagem ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default Imagens;
