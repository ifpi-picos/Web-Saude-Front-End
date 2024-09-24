class ConsultasService {
  async unidadesdeSaude() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/unidades-de-saude`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }

      const data = await res.json();
      if (!data.Message || !Array.isArray(data.Message)) {
        throw new Error("Resposta inválida da API");
      }

      const unidades = data.Message;

      return unidades;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarUnidadedeSaude(nome) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/unidade-de-saude/${nome}`,
        {
          cache:"no-store",

        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async filtrarUnidadesDeSaude(nome) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/buscar/?nome=${nome}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarEspecialidadesPeloNomeDaUnidadeDeSaude(nome) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/especialidades/${nome}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async unidadesdeSaudePaginadas(number) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/buscarPorPagina/${number}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarClinicas() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/clinicas`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarHospital(nome) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/hospital/${nome}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarHospitais() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/hospitais`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarClinica(nome) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/clinica/${nome}`,
        {
          cache: "cache",
        }
      );
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarUsuarioPeloNome(nome) {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/usuario/${nome}`,
        {
          cache: "no-store",
        }
      );
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarEspecialidades() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/especialidades`,
        {
          cache: "no-store",
        }
      );
      const info = await res.json();
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarTotalDasUnidadesDeSaude() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/total-unidades-de-saude`,
        {
          cache: "no-store",
        }
      );
      const total = await res.json();
      return total;
    } catch (error) {
      console.error(error);
    }
  }

  async pegarTotalDeUsuarios() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/total-usuarios`,
        {
          cache: "no-store",
        }
      );
      const total = await res.json();
      return total;
    } catch (error) {
      console.error(error);
    }
  }

  async pedidos() {
    try {
      const res = await fetch(
        `https://web-saude-back-end-api.onrender.com/pedidos`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (!data.Message || !Array.isArray(data.Message)) {
        throw new Error("Resposta inválida da API");
      }
      const unidades = data.Message;
      return unidades;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ConsultasService();
