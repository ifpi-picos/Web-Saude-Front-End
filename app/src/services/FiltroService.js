class FiltroSeerrvice{
    async pegarClinicas() {
        const res = await fetch(`https://api-web-saude.vercel.app/clinicas`);
        const info = await res.json();
    
        return info;
      }
      async pegarHospitais() {

        const res = await fetch(`https://api-web-saude.vercel.app/hospitais`);
        const info = await res.json();
        return info
    }
    async pegarHospitaisEClincas() {
        const [clinicas, hospitais] = await Promise.all([
          this.pegarClinicas(),
          this.pegarHospitais(),
        ]);
    
        // Combine as clínicas e hospitais em um único objeto ou array, dependendo da estrutura dos dados
        const hospitaisEClincas = { clinicas, hospitais }; // Exemplo de combinação em um objeto
      
        return hospitaisEClincas;
      }
}

export default new FiltroSeerrvice()
