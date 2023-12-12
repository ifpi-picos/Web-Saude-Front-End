class ConsultasService {
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
    try {
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
    } catch (error) {
      console.error(error);
    }
  }
  async filtrarUnidadesDeSaude(nome) {
    const res = await fetch(
      `https://api-web-saude.vercel.app/buscar/?nome=${nome}`,
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
  async pegarEspecialidadesPeloNomeDaUnidadeDeSaude(nome) {
    try {
      const res = await fetch(
        `https://api-web-saude.vercel.app/especialidades/${nome}`,
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
        `https://api-web-saude.vercel.app/buscarPorPagina/${number}`,
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
    const res = await fetch(`https://api-web-saude.vercel.app/clinicas`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`houve um erro no servidor! ${res.status}`);
    }

    const info = await res.json();

    return info;
  }
  async pegarHospital(nome) {
    const res = await fetch(
      `https://api-web-saude.vercel.app/hospital/${nome}`,
      {
        cache: "no-store",
      }
    );
    const info = await res.json();
    return info;
  }

  async pegarHospitais() {
    const res = await fetch(`https://api-web-saude.vercel.app/hospitais`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`houve um erro no servidor! ${res.status}`);
    }

    const info = await res.json();

    return info;
  }
  async pegarClinica(nome) {
    const res = await fetch(
      `https://api-web-saude.vercel.app/clinica/${nome}`,
      {
        cache: "no-store",
      }
    );
    const info = await res.json();
    return info;
  }

  async pegarUsuarioPeloNome(nome) {
    const res = await fetch(
      `https://api-web-saude.vercel.app/usuario/${nome}`,
      {
        cache: "no-store",
      }
    );

    const info = await res.json();
    return info;
  }
  async pegarEspecialidades() 
  {
    const res = await fetch(`https://api-web-saude.vercel.app/especialidades`, {
      cache: "no-store",
    });
    const info = await res.json();
    return info;
  }
  
  async pegarTotalDasUnidadesDeSaude(){
    const res = await fetch(`https://api-web-saude.vercel.app/total-unidades-de-saude`,{
      cache:"no-store"
    })
    
    const total = await res.json();
    return total
  }

  async pegarTotalDeUsuarios(){
    const res = await fetch(`https://api-web-saude.vercel.app/total-usuarios`,{
      cache:"no-store"
    })
    
    const total = await res.json();
    return total
  }
}

export default new ConsultasService();
