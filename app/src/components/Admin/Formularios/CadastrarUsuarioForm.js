import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import PrivateRoute from "../privateRouter";
import styles from "@/components/Admin/Formularios/css/Form.module.css";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    marginTop: "8px",
    borderRadius: "7px",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue" : "#00285f",
    color: "white",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    marginTop: "-50px",
  }),
};

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome obrigatório")
    .min(3, "Tamanho muito grande")
    .max(255, "Tamanho muito grande"),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .max(255, "E-mail muito longo")
    .matches(/@(gmail\.com|hotmail\.com|outlook\.com)$/, "e-mail inválido"),
  senha: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Mínimo de 6 caracteres")
    .max(12, "Máximo de 12 caracteres"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas devem coincidir")
    .required("Confirmação obrigatória"),
  tipo: yup.string().required("Selecione o tipo"),
});

export default function CadastrarUsuarioForm({ onClose, atualizarUsuarios }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedType, setSelectedType] = useState(null);
  const onSubmit = async formData => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://api-web-saude.vercel.app/novo-usuario`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            confirmarSenha: formData.confirmarSenha,
            tipo: selectedType.value,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        atualizarUsuarios();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PrivateRoute>
      <>
        <section
          className={styles.sectionForm}
          style={{ height: "100%", backgroundColor: "#eeeeee" }}
        >
          <div
            className={styles.divForm}
            style={{ marginTop: "0px", borderRadius: "20px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.divLogo}>
                <Image
                  className={styles.imageLogo}
                  src="/imgs/logo.png"
                  alt="logo"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className={styles.title}>Cadastrar Usuário</h2>
              <div className={styles.divInputs}>
                <label>Nome</label>
                <Controller
                  name="nome"
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
                          const pastedText =
                            await navigator.clipboard.readText();
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
                <label>Email</label>
                <Controller
                  name="email"
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
                          const pastedText =
                            await navigator.clipboard.readText();
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
                <label>Senha</label>
                <Controller
                  control={control}
                  name="senha"
                  render={({ field }) => (
                    <input
                      className={errors.senha ? styles.erro : ""}
                      type="password"
                      name="senha"
                      value={field.value}
                      onChange={e => {
                        if (e.target.value.length <= 12) {
                          field.onChange(e);
                        }
                      }}
                      onPaste={async e => {
                        e.preventDefault();

                        try {
                          const pastedText =
                            await navigator.clipboard.readText();
                          if (pastedText.length <= 12) {
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
                {errors.senha && (
                  <div className={styles.error}>{errors.senha.message} </div>
                )}
                <label>Confirmar Senha</label>
                <Controller
                  control={control}
                  name="confirmarSenha"
                  render={({ field }) => (
                    <input
                      className={errors.confirmarSenha ? styles.erro : ""}
                      type="password"
                      name="confirmarSenha"
                      value={field.value}
                      onChange={e => {
                        if (e.target.value.length <= 12) {
                          field.onChange(e);
                        }
                      }}
                      onPaste={async e => {
                        e.preventDefault();

                        try {
                          const pastedText =
                            await navigator.clipboard.readText();
                          if (pastedText.length <= 12) {
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
                {errors.confirmarSenha && (
                  <div className={styles.error}>
                    {errors.confirmarSenha.message}
                  </div>
                )}

                <label>Tipo</label>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className={styles.select}
                      styles={customStyles}
                      options={[
                        { value: "admin", label: "Admin" },
                        { value: "funcionario", label: "Funcionário" },
                      ]}
                      value={selectedType}
                      onChange={selectedOption => {
                        setSelectedType(selectedOption);
                        field.onChange(
                          selectedOption ? selectedOption.value : ""
                        );
                      }}
                      getOptionValue={option => option.value}
                    />
                  )}
                />
                {errors.tipo && (
                  <div className={styles.error}>{errors.tipo.message}</div>
                )}
              </div>
              <div className={styles.divButtonSubmit}>
                <button className={styles.button} type="submit">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </section>
      </>
    </PrivateRoute>
  );
}
