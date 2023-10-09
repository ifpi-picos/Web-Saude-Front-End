
class FiltroSeerrvice {
  
  async pegarClinicas() {
    const res = await fetch(`https://api-web-saude.vercel.app/clinicas`);

    const info = await res.json();

    return info;
  }
  async pegarHospitais() {
    const res = await fetch(`https://api-web-saude.vercel.app/hospitais`);
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
    
        const hospitaisEClincas = { clinicas, hospitais }; 

        const pegarclinicas =  hospitaisEClincas.clinicas || []; 
        const pegashospitais = hospitaisEClincas.hospitais || [];

        const informacao = [...pegarclinicas, ...pegashospitais];

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
