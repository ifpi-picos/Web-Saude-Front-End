
class HospitalService{

async pegarHospitais() {

    const res = await fetch(`https://api-web-saude.vercel.app/hospitais`);
    const info = await res.json();
    return info
}
}

export default new  HospitalService()