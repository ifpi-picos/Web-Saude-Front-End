class FiltroSeerrvice {

  async filtrar(nome) {
    const res = await fetch(
      `https://api-web-saude.vercel.app/buscar/?nome=${nome}`
    );
    const info = await res.json();
    return info;
  }

  async pegarClinica(nome) {
    const res = await fetch(`https://api-web-saude.vercel.app/clinica/${nome}`);
    const info = await res.json();
    return info;
  }
  async pegarHospital() {
    const res = await fetch(
      `https://api-web-saude.vercel.app/hospital/${nome}`
    );
    const info = await res.json();
    return info;
  }
 

  async  unidadesdeSaude() {
    try {
      const res = await fetch(`https://api-web-saude.vercel.app/unidades-de-saude`);
  
      if (!res.ok) {
        throw new Error(`Houve um erro no servidor! ${res.status}`);
      }
  
      const data = await res.json();
      if (!data.Message || !Array.isArray(data.Message)) {
        throw new Error('Resposta inválida da API');
      }
  
      const unidades = data.Message;
  
      return unidades;
    } catch (error) {
      console.error(error);
    }
  }
  
  //
  
}

export default new FiltroSeerrvice();
