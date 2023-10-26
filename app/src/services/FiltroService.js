class FiltroSeerrvice {
  async unidadesdeSaude() {
    try {
      const res = await fetch(
        `https://api-web-saude.vercel.app/unidades-de-saude`,
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
    const res = await fetch(
      `https://api-web-saude.vercel.app/hospital-ou-clinica/${nome}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error(`Houve um erro no servidor! ${res.status}`);
    }
    const info = await res.json();
    return info;
  }
}

export default new FiltroSeerrvice();
