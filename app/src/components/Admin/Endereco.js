import Image from "next/image";
import { useRef } from "react";

export default function EnderecoForm({
  showEnderecoForm,
  handleSubmit,
  onSubmit,
  register,
}) {
  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("uf").value = "";
  }

  async function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, "");

    // Verifica se campo cep possui valor informado.
    if (cep !== "") {
      // Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        // Define os campos como vazios antes de fazer a consulta.
        document.getElementById("rua").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("uf").value = "";

        try {
          // Faz a chamada à API do ViaCEP usando o fetch.
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          // Se a resposta for bem-sucedida, atualiza os campos com os valores retornados.
          if (!data.erro) {
            document.getElementById("rua").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("uf").value = data.uf || "";
          } else {
            // CEP não encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
          }
        } catch (error) {
          // Em caso de erro na chamada da API, limpa os campos e exibe uma mensagem de erro.
          limpa_formulário_cep();
          alert(
            "Erro ao consultar o CEP. Por favor, tente novamente mais tarde."
          );
        }
      } else {
        // CEP é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } else {
      // CEP sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  }

  const firstInputRef = useRef(null);

  return (
    <div className="box-endereco">
      <div className="img-box">
        <Image alt="Imagem do formulário" width={200} height={200} />
      </div>
      <div className="form-box">
        <h2>Cadastrar Endereço</h2>
        <p>
          Deseja Voltar? <a href="#"> Painel </a>{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              name="cep"
              {...register("cep")}
              placeholder="CEP"
              id="cep"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="rua">Rua</label>
            <input
              type="text"
              name="rua"
              {...register("rua")}
              placeholder="Logradouro"
              id="rua"
              required
            />
          </div>

          <div className="input-group longitude">
            <label htmlFor="numero">Número</label>
            <input
              type="number"
              name="numero"
              {...register("numero")}
              placeholder="Número"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              name="bairro"
              {...register("bairro")}
              placeholder="Bairro"
              id="bairro"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              name="cidade"
              {...register("cidade")}
              placeholder="Cidade"
              id="cidade"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="uf">Estado</label>
            <input
              type="text"
              name="uf"
              {...register("uf")}
              placeholder="Estado"
              id="uf"
              required
            />
          </div>

          <div className="input-group">
            <button type="submit" className="div-button-prox">
              Próximo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
