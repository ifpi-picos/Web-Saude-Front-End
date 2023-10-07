class Clinica {
  async pegarClinica(nome) {
    const res = await fetch(`https://api-web-saude.vercel.app/clinica/${nome}`);
    const info = await res.json();
    return info;
  }
}

export default new Clinica();
