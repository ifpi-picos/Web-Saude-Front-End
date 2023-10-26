class HospitalService {
  async pegarHospitais() {
    const res = await fetch(`https://api-web-saude.vercel.app/hospitais`);
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
}

export default new HospitalService();
