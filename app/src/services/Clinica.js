class Clinica{

    async pegarClinicas() {
       const res = await fetch(`https://api-web-saude.vercel.app/clinicas`);
       const info = await res.json();
     
       return info;
     }
     async pegarClinica(nome) {
        const res = await fetch(`https://api-web-saude.vercel.app/clinica/${nome}`);
        const info = await res.json();
        return info;
      }
}
   
export default new Clinica()