
class FiltroSeerrvice {
  
  async pegarClinicas() {
    const res = await fetch(`https://api-web-saude.vercel.app/clinicas`,
    {
      cache:"no-store"
    }
     );
     
    if(!res.ok){
      throw new Error(`houve um erro no servidor! ${res.status}`)

    }
    const info = await res.json();

    return info;
  }
  async pegarHospitais() {
    const res = await fetch(`https://api-web-saude.vercel.app/hospitais`);
    
    if(!res.ok){
      throw new Error(`houve um erro no servidor! ${res.status}`)
    }

    const info = await res.json();
    
    return info;
  }
  /*async pegarHospitaisEClincas() {
    const [clinicas, hospitais] = await Promise.all([
      this.pegarClinicas(),
      this.pegarHospitais(),
    ]);

    const hospitaisEClincas = { clinicas, hospitais };

    return hospitaisEClincas;
  }
*/
  
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
}

export default new FiltroSeerrvice();
