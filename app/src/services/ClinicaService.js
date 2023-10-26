class Clinica {
  async pegarClinica(nome) {
    const res = await fetch(`https://api-web-saude.vercel.app/clinica/${nome}`);
    const info = await res.json();
    return info;
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
}

export default new Clinica();
