"use client";
import { useState } from "react";
import CloudinaryUploadWidget from "../../UsuariosAndAdmin/Upload";
import SelectEspecialidadesSalvar from "@/components/UsuariosAndAdmin/SelectEspecialidadesSalvar";
import { Modal, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useDecodedToken } from "@/services/decodeToken";
import "@/components/Admin/Formularios/css/Form.css";

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("nome obrigatório")
    .max(255, "tamanho muito longo"),
  imagem: yup.string(),
  horarioSemana: yup.object().shape({
    open: yup.string().required("horário obrigatório").nullable(),
    close: yup.string().required("horário obrigatório").nullable(),
  }),

  email: yup
    .string()
    .email("Informe um e-mail válido")
    .max(255, "e-mail muito longo").matches(/@(gmail\.com|hotmail\.com|outlook\.com)$/,"e-mail inválido"),
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

export default function ClinicaForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [imageLink, setImageLink] = useState("");

  const decodedToken = useDecodedToken();
  console.log(decodedToken);
  const onSubmit = async formData => {
    formData.imagem = imageLink;
    formData.especialidades = selectedSpecialtyIds;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://api-web-saude.vercel.app/admin/nova-clinica",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setShowModal(true);
        if (decodedToken === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/funcionario";
        }
      } else {
        console.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageURLChange = imageUrl => {
    setImageURL(imageUrl);
    setImageLink(imageUrl);
  };
  const handleSpecialtyChange = selectedSpecialties => {
    setError("especialidades", "");
    const selectedIds = selectedSpecialties.map(specialty => specialty.value);
    setSelectedSpecialtyIds(selectedIds);
  };
  return (
    <>
      <section className="section-form">
        <div className="div-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="div-logo">
              {decodedToken === "admin" ? (
                <Link href="/dashboard">
                  <Image
                    className="image-logo"
                    src="/imgs/logo.png"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              ) : (
                <Link href="/funcionario">
                  <Image
                    className="image-logo"
                    src="/imgs/logo.png"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              )}
            </div>

            <h2 className="title">Cadastrar Clínica</h2>
            <div className="div-inputs">
              <label>Nome</label>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.nome ? "erro" : ""}
                    type="text"
                    name="nome"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                    {...field}
                  />
                )}
              />
              {errors.nome && (
                <div className="error">{errors.nome.message}</div>
              )}
              <CloudinaryUploadWidget onURLChange={handleImageURLChange} />
              {errors.imagem && (
                <div className="error">{errors.imagem.message}</div>
              )}

              <SelectEspecialidadesSalvar onChange={handleSpecialtyChange} />
              {errors.especialidades && (
                <div className="error">{errors.especialidades.message}</div>
              )}
              <label htmlFor="horarioSemanaAbertura">
                Horário Semana Abertura
              </label>
              <Controller
                name="horarioSemana.open"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.horarioSemana?.open ? "erro" : ""}
                    type="time"
                    name="horarioSemana.open"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.horarioSemana?.open && (
                <div className="error">
                  {errors.horarioSemana?.open.message}
                </div>
              )}
              <label htmlFor="horarioSemanaFechamento">
                Horário Semana Fechamento
              </label>
              <Controller
                name="horarioSemana.close"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.horarioSemana?.close ? "erro" : ""}
                    type="time"
                    name="horarioSemana.close"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.horarioSemana?.close && (
                <div className="error">
                  {errors.horarioSemana?.close.message}
                </div>
              )}
              <label htmlFor="sabadoAbertura">Sábado Abertura (opcional)</label>
              <Controller
                name="sabado.open"
                control={control}
                render={({ field }) => (
                  <input
                    type="time"
                    name="sabado.open"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <label htmlFor="sabadoFechamento">
                Sábado Fechamento (opcional)
              </label>
              <Controller
                name="sabado.close"
                control={control}
                render={({ field }) => (
                  <input
                    type="time"
                    name="sabado.close"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <label htmlFor="email">Email (opcional)</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.email ? "erro" : ""}
                    type="email"
                    name="email"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
              <label htmlFor="whatsapp">Whatsapp (opcional)</label>
              <Controller
                name="whatsapp"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.whatsapp ? "erro" : ""}
                    type="tel"
                    name="whatsapp"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 11) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.whatsapp && (
                <div className="error">{errors.whatsapp.message}</div>
              )}
              <label htmlFor="instagram">Instagram (opcional)</label>
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    name="instagram"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.instagram && (
                <div className="error">{errors.instagram.message}</div>
              )}
              <label htmlFor="descricao">Descrição (opcional)</label>
              <Controller
                name="descricao"
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
                <div className="error">{errors.descricao.message}</div>
              )}
              <label htmlFor="longitude">Longitude</label>
              <Controller
                name="longitude"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.longitude ? "erro" : ""}
                    type="text"
                    name="longitude"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.longitude && (
                <div className="error">{errors.longitude.message}</div>
              )}
              <label htmlFor="latitude">Latitude</label>
              <Controller
                name="latitude"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.latitude ? "erro" : ""}
                    type="text"
                    name="latitude"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.latitude && (
                <div className="error">{errors.latitude.message}</div>
              )}

              <label htmlFor="cep">CEP</label>
              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.cep ? "erro" : ""}
                    type="text"
                    name="cep"
                    value={field.value}
                    onChange={(e) => {
                    if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.cep && <div className="error">{errors.cep.message}</div>}
              <label htmlFor="rua">Rua</label>
              <Controller
                name="rua"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.rua ? "erro" : ""}
                    type="text"
                    name="rua"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.rua && <div className="error">{errors.rua.message}</div>}
              <label htmlFor="numero">Número</label>
              <Controller
                name="numero"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.numero ? "erro" : ""}
                    type="text"
                    name="numero"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.numero && (
                <div className="error">{errors.numero.message}</div>
              )}
              <label htmlFor="bairro">Bairro</label>
              <Controller
                name="bairro"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.bairro ? "erro" : ""}
                    type="text"
                    name="bairro"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.bairro && (
                <div className="error">{errors.bairro.message}</div>
              )}
              <label htmlFor="cidade">Cidade</label>
              <Controller
                name="cidade"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.cidade ? "erro" : ""}
                    type="text"
                    name="cidade"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 255) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.cidade && (
                <div className="error">{errors.cidade.message}</div>
              )}
              <label htmlFor="uf">Estado</label>
              <Controller
                name="uf"
                control={control}
                render={({ field }) => (
                  <input
                    className={errors.uf ? "erro" : ""}
                    type="text"
                    name="uf"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 2) {
                        field.onChange(e);
                      }
                    }}
                  />
                )}
              />
              {errors.uf && <div className="error">{errors.uf.message}</div>}
            </div>
            <div className="div-button-submit">
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clínica Salva com Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>A clínica foi salva com sucesso.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
