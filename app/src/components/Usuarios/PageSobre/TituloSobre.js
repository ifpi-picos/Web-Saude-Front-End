import "@/components/Usuarios/css/Sobre.css"
import Image from "next/image"
export default function TituloSobre() {
  return (
    <>
    <section className="section-sobre" style={{marginTop:"120px"}}>
    <div className="div-sobre">
        <h1>Sobre</h1>
      </div>
      <div className="img-sobre">
        <Image
          src="/imgs/sobre.svg"
          alt="img-sobre"
          width={200}
          height={200}
        />
      </div>
      </section>

    <section className="section-titulo">
     
      <h2>Quem Somos?</h2>
      <p>
        Somos a plataforma dedicada a fornecer informações essenciais sobre as
        unidades de saúde em nossa rede. Nosso compromisso é simplificar o
        acesso às informações relevantes sobre clínicas e hospitais, capacitando
        os usuários a tomar decisões informadas sobre sua saúde. Priorizamos a
        transparência e a facilidade de uso, fornecendo detalhes claros sobre as
        especialidades disponíveis em cada unidade, localizações, horários de
        funcionamento e qualquer informação relevante para facilitar a escolha
        da melhor opção de atendimento. Estamos aqui para conectar você às
        informações que importam, garantindo que sua jornada em busca de
        cuidados de saúde seja simples e eficiente.
      </p>
      <h2>Objetivos:</h2>
      <p>
        A proposta foi criar um sistema onde as pessoas terão acesso ao perfil
        dos hospitais e das clínicas contendo suas devidas informações, como as
        especialidades médicas, localização, dia e horário. Minimizando assim, o
        número de pessoas desinformadas quanto às clínicas ou hospitais
        presentes na cidade de Picos-PI.
      </p>
    </section>
    </>

  );
}
