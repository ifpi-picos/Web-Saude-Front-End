"use client";
import { useState,useEffect } from "react";
import CloudinaryUploadWidget from "../../UsuariosAndAdmin/Upload";
import SelectEspecialidades from "../../UsuariosAndAdmin/SelectEspecialidades";
import { Modal, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/components/Admin/Formularios/css/Form.css";
import Image from "next/image";

const schema = yup.object().shape({
  nome: yup.string(),
  imagem: yup.string(),
  email: yup.string().email("Informe um e-mail válido"),
  whatsapp: yup.string().matches(/^\d{10,11}$/, "Informe um número válido"),
  instagram: yup.string(),
  descricao: yup.string(),
  longitude: yup.string(),
  latitude: yup.string(),
  cep: yup.string(),
  rua: yup.string(),
  numero: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  uf: yup.string(),
  especialidades: yup.array().min(1, "Selecione pelo menos uma especialidade"),
});

export default function AlterarHospitalForm({hospitalData,nome}) {
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
  const [imageURL, setImageURL] = useState("");
  const [imageLink, setImageLink] = useState("");

  const onSubmit = async formData => {
    formData.imagem = imageLink || hospitalData.imagem;
    formData.especialidades = selectedSpecialtyIds;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/admin/alterar-hospital/${hospitalData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("dados",formData)
      if (!response.ok) {
        console.error(`Erro na solicitação: ${response.status}`);
      } else {
        const responseData = await response.json();
        setShowModal(true);
        window.location.href = "/dashboard";
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
                <Image
                  className="image-logo"
                  src="/imgs/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                  
                />
              </div>

              <h2 className="title">Alterar Hospital</h2>
              <div className="div-inputs">
                <label>Nome</label>
                <Controller
                  name="nome"
                  defaultValue={hospitalData.nome}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="nome"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      {...field}
                    />
                  )}
                />
                {errors.nome && (
                  <div className="error">{errors.nome.message}</div>
                )}
                <CloudinaryUploadWidget onURLChange={handleImageURLChange} defaultImage={hospitalData.imagem} />
                {errors.imagem && (
                  <div className="error">{errors.imagem.message}</div>
                )}

                <SelectEspecialidades onChange={handleSpecialtyChange} nome={nome} />
                  {errors.especialidades && (
                    <div className="error">{errors.especialidades.message}</div>
                  )}

                <label htmlFor="email">Email</label>
                <Controller
                  name="email"
                  defaultValue={hospitalData.email}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      name="email"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.email && (
                  <div className="error">{errors.email.message}</div>
                )}
                <label htmlFor="whatsapp">Whatsapp</label>
                <Controller
                  name="whatsapp"
                  defaultValue={hospitalData.whatsapp}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="tel"
                      name="whatsapp"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.whatsapp && (
                  <div className="error">{errors.whatsapp.message}</div>
                )}
                <label htmlFor="instagram">Instagram</label>
                <Controller
                  name="instagram"
                  defaultValue={hospitalData.instagram}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="instagram"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.instagram && (
                  <div className="error">{errors.instagram.message}</div>
                )}
                <label htmlFor="descricao">Descrição</label>
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
                  <div className="error">{errors.descricao.message}</div>
                )}
                <label htmlFor="longitude">Longitude</label>
                <Controller
                  name="longitude"
                  defaultValue={hospitalData.longitude}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="longitude"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.longitude && (
                  <div className="error">{errors.longitude.message}</div>
                )}
                <label htmlFor="latitude">Latitude</label>
                <Controller
                  name="latitude"
                  defaultValue={hospitalData.latitude}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="latitude"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.latitude && (
                  <div className="error">{errors.latitude.message}</div>
                )}

                <label htmlFor="cep">CEP</label>
                <Controller
                  name="cep"
                  defaultValue={hospitalData.endereco.cep}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="cep"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.cep && (
                  <div className="error">{errors.cep.message}</div>
                )}
                <label htmlFor="rua">Rua</label>
                <Controller
                  name="rua"
                  defaultValue={hospitalData.endereco.rua}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="rua"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.rua && (
                  <div className="error">{errors.rua.message}</div>
                )}
                <label htmlFor="numero">Número</label>
                <Controller
                  name="numero"
                  defaultValue={hospitalData.endereco.numero}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="numero"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.numero && (
                  <div className="error">{errors.numero.message}</div>
                )}
                <label htmlFor="bairro">Bairro</label>
                <Controller
                  name="bairro"
                  defaultValue={hospitalData.endereco.bairro}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="bairro"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.bairro && (
                  <div className="error">{errors.bairro.message}</div>
                )}
                <label htmlFor="cidade">Cidade</label>
                <Controller
                  name="cidade"
                  defaultValue={hospitalData.endereco.cidade}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="cidade"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.cidade && (
                  <div className="error">{errors.cidade.message}</div>
                )}
                <label htmlFor="uf">Estado</label>
                <Controller
                  name="uf"
                  defaultValue={hospitalData.endereco.uf}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      name="uf"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.uf && <div className="error">{errors.uf.message}</div>}
              </div>
              <div className="div-button">
                <button type="submit">Enviar</button>
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