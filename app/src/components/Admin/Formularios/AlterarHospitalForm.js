"use client";
import { useState } from "react";
import CloudinaryUploadWidget from "../Upload";
import SelectEspecialidadesUpdate from "@/components/Admin/SelectEspecialidadesUpdate";
import { Modal, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useDecodedToken } from "@/services/decodeToken";
import Imagens from "../Imagens";
import styles from "@/components/Admin/Formularios/css/Form.module.css";

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("nome obrigatório")
    .max(255, "tamanho muito longo"),
  imagem: yup.string(),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .max(255, "e-mail muito longo")
    .matches(/@(gmail\.com|hotmail\.com|outlook\.com)$/, "e-mail inválido"),
  whatsapp: yup.string().matches(/^\d{10,11}$/, "Informe um número válido"),
  instagram: yup.string().max(255, "tamanho muito longo"),
  descricao: yup.string(),
  longitude: yup
    .string()
    .required("A longitude é obrigatória")
    .max(10, "tamanho muito longo"),
  latitude: yup
    .string()
    .required("A latitude é obrigatória")
    .max(10, "tamanho muito longo"),
  cep: yup
    .string()
    .required("O CEP é obrigatório")
    .max(10, "tamanho muito longo"),
  rua: yup
    .string()
    .required("A rua é obrigatória")
    .max(255, "tamanho muito longa"),
  numero: yup
    .string()
    .required("O número é obrigatório")
    .max(10, "tamanho muito longo"),
  bairro: yup
    .string()
    .required("O bairro é obrigatório")
    .max(255, "tamanho muito longo"),
  cidade: yup
    .string()
    .required("A cidade é obrigatória")
    .max(255, "tamanho muito lomgo"),
  uf: yup
    .string()
    .required("O estado (UF) é obrigatório")
    .min(2, "tamanho muito curto")
    .max(2, "tamanho muito longo"),
  especialidades: yup.array().min(1, "Selecione pelo menos uma especialidade"),
});
export default function AlterarHospitalForm({ hospitalData, nome }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [imagensLink, setImagensLink] = useState([]);
  const decodedToken = useDecodedToken();

  const onSubmit = async formData => {
    formData.imagem = imageLink || hospitalData.imagem;
    formData.imagens = imagensLink;

    if (selectedSpecialtyIds.length === 0) {
      formData.especialidades = hospitalData.especialidades;
    } else {
      formData.especialidades = selectedSpecialtyIds;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/admin/alterar-hospital/${hospitalData._id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        console.error(`Erro na solicitação: ${response.status}`);
      } else {
        const responseData = await response.json();
        console.log(responseData);
        setShowModal(true);
        if (decodedToken === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/funcionario";
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageURLChange = imageUrl => {
    setImageLink(imageUrl);
  };
  const handleImagensURLChange = imageUrl => {
    setImagensLink(imageUrl);
  };
  const handleSpecialtyChange = selectedSpecialties => {
    setError("especialidades", "");
    const selectedIds = selectedSpecialties.map(specialty => specialty.value);
    setSelectedSpecialtyIds(selectedIds);
  };

  return (
    <>
      <section className={styles.sectionForm} style={{ height: "100%" }}>
        <div className={styles.divFormUnidadesDeSaude}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.divLogo}>
              {decodedToken === "admin" ? (
                <Link href="/dashboard">
                  <Image
                    className={styles.imageLogo}
                    src="/imgs/logo.png"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              ) : (
                <Link href="/funcionario">
                  <Image
                    className={styles.imageLogo}
                    src="/imgs/logo.png"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              )}
            </div>

            <h2 className={styles.title}>Alterar Hospital</h2>
            <div className={styles.divInputs}>
              <label>Nome</label>
              <Controller
                name="nome"
                defaultValue={hospitalData.nome}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.nome ? styles.erro : ""}
                    type="text"
                    name="nome"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 255) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.nome && (
                <div className={styles.error}>{errors.nome.message}</div>
              )}
              <CloudinaryUploadWidget
                onURLChange={handleImageURLChange}
                defaultImage={hospitalData.imagem}
              />
              {errors.imagem && (
                <div className={styles.error}>{errors.imagem.message}</div>
              )}

              <SelectEspecialidadesUpdate
                onChange={handleSpecialtyChange}
                nome={nome}
              />
              {errors.especialidades && (
                <div className={styles.error}>
                  {errors.especialidades.message}
                </div>
              )}

              <label htmlFor="email">Email (opcional)</label>
              <Controller
                name="email"
                defaultValue={hospitalData.email}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.email ? styles.erro : ""}
                    type="email"
                    name="email"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 255) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <div className={styles.error}>{errors.email.message}</div>
              )}
              <label htmlFor="whatsapp">Whatsapp (opcional)</label>
              <Controller
                name="whatsapp"
                defaultValue={hospitalData.whatsapp}
                control={control}
                render={({ field }) => (
                  <input
                    type="tel"
                    className={errors.whatsapp ? styles.erro : ""}
                    name="whatsapp"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 11) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 11) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.whatsapp && (
                <div className={styles.error}>{errors.whatsapp.message}</div>
              )}
              <label htmlFor="instagram">Instagram (opcional)</label>
              <Controller
                name="instagram"
                defaultValue={hospitalData.instagram}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    name="instagram"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 255) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.instagram && (
                <div className="error">{errors.instagram.message}</div>
              )}
              <label htmlFor="descricao">Descrição (opcional)</label>
              <Controller
                name="descricao"
                defaultValue={hospitalData.descricao}
                control={control}
                render={({ field }) => (
                  <textarea
                    name="descricao"
                    value={field.value}
                    onChange={field.onChange}
                    cols="30"
                    rows="10"
                    placeholder="Descrição"
                  />
                )}
              />
              {errors.descricao && (
                <div className={styles.error}>{errors.descricao.message}</div>
              )}
              <label htmlFor="longitude">Longitude</label>
              <Controller
                name="longitude"
                defaultValue={hospitalData.longitude}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.longitude ? styles.erro : ""}
                    type="text"
                    name="longitude"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 10) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.longitude && (
                <div className={styles.error}>{errors.longitude.message}</div>
              )}
              <label htmlFor="latitude">Latitude</label>
              <Controller
                name="latitude"
                defaultValue={hospitalData.latitude}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.latitude ? styles.erro : ""}
                    type="text"
                    name="latitude"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 10) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.latitude && (
                <div className={styles.error}>{errors.latitude.message}</div>
              )}

              <label htmlFor="cep">CEP</label>
              <Controller
                name="cep"
                defaultValue={hospitalData.endereco.cep}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.cep ? styles.erro : ""}
                    type="text"
                    name="cep"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 10) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.cep && (
                <div className={styles.error}>{errors.cep.message}</div>
              )}
              <label htmlFor="rua">Rua</label>
              <Controller
                name="rua"
                defaultValue={hospitalData.endereco.rua}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.rua ? styles.erro : ""}
                    type="text"
                    name="rua"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 255) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.rua && (
                <div className={styles.error}>{errors.rua.message}</div>
              )}
              <label htmlFor="numero">Número</label>
              <Controller
                name="numero"
                defaultValue={hospitalData.endereco.numero}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.numero ? styles.erro : ""}
                    type="text"
                    name="numero"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 10) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.numero && (
                <div className={styles.error}>{errors.numero.message}</div>
              )}
              <label htmlFor="bairro">Bairro</label>
              <Controller
                name="bairro"
                defaultValue={hospitalData.endereco.bairro}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.bairro ? styles.erro : ""}
                    type="text"
                    name="bairro"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 255) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.bairro && (
                <div className={styles.error}>{errors.bairro.message}</div>
              )}
              <label htmlFor="cidade">Cidade</label>
              <Controller
                name="cidade"
                defaultValue={hospitalData.endereco.cidade}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.cidade ? styles.erro : ""}
                    type="text"
                    name="cidade"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 255) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.cidade && (
                <div className={styles.error}>{errors.cidade.message}</div>
              )}
              <label htmlFor="uf">Estado</label>
              <Controller
                name="uf"
                defaultValue={hospitalData.endereco.uf}
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.uf ? styles.erro : ""}
                    type="text"
                    name="uf"
                    value={field.value}
                    onChange={e => {
                      if (e.target.value.length <= 2) {
                        field.onChange(e);
                      }
                    }}
                    onPaste={async e => {
                      e.preventDefault();

                      try {
                        const pastedText = await navigator.clipboard.readText();
                        if (pastedText.length <= 2) {
                          field.onChange({ target: { value: pastedText } });
                        }
                      } catch (error) {
                        console.error(
                          "Erro ao ler dados da área de transferência:",
                          error
                        );
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.uf && (
                <div className={styles.error}>{errors.uf.message}</div>
              )}
            </div>
            <Imagens
              onURLChange={handleImagensURLChange}
              defaultImages={hospitalData.imagens}
            />
            <div
              className={styles.divButtonSubmit}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button className={styles.button} type="submit">
                Alterar
              </button>
            </div>
          </form>
        </div>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hospital Alterado com Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>O Hospital foi Alterado com sucesso.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
