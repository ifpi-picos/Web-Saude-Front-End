class EspecialidadeService{

    async pegarEspecialidades() {
        const res = await fetch(`https://api-web-saude.vercel.app/especialidades`,{
            cache:"no-store"
        });
        const info = await res.json();
        return info;
      }

}

export default new EspecialidadeService()