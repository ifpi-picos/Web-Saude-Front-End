class FiltroSeerrvice {
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

  async pegarHospitaisEClincas() {
    const [clinicas, hospitais] = await Promise.all([
      this.pegarClinicas(),
      this.pegarHospitais(),
    ]);
    const informacao = [...clinicas, ...hospitais];

    return informacao;
  }
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
  async pegarHospitalEClinca() {
    const [clinica, hospital] = await Promise.all([
      this.pegarClinica(),
      this.pegarHospital(),
    ]);
    const informacao = [...clinica, ...hospital];

    return informacao;
  }
}

export default new FiltroSeerrvice();
