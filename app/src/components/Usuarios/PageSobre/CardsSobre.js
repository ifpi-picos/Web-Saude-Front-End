import styles from "@/components/Usuarios/css/Sobre.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap

export default function CardsSobres() {
  return (
    <>
      <section className={styles.sectionSobreTitulo}> 
        <div className={`card ${styles.card}`}> 
          <div className={`card-header ${styles.cardHeader}`}>Clínicas</div> 
          <div className={`card-body ${styles.cardBody}`}>
            <div className={`blockquote mb-0 ${styles.blockquote}`}>
              <p>
                Clínicas são unidades de saúde especializadas que oferecem
                serviços médicos voltados para áreas específicas da medicina.
                Geralmente mais focadas e especializadas do que hospitais, as
                clínicas fornecem atendimento ambulatorial, consultas médicas,
                exames diagnósticos e tratamentos especializados. Elas são
                projetadas para serem eficientes e específicas, concentrando-se
                em uma única especialidade, como dermatologia, ortopedia,
                oftalmologia, entre outras. As clínicas desempenham um papel
                crucial na prestação de cuidados preventivos e curativos, muitas
                vezes sendo a primeira linha de defesa para pacientes que buscam
                assistência médica especializada.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionSobreTitulo}> 
        <div className={`card ${styles.card}`}> 
          <div className={`card-header ${styles.cardHeader}`}>Hospitais</div> 
          <div className={`card-body ${styles.cardBody}`}> 
            <div className={`blockquote mb-0 ${styles.blockquote}`}>
              <p>
                Hospitais são instituições de saúde mais abrangentes, oferecendo
                uma ampla gama de serviços médicos e cirúrgicos. Ao contrário
                das clínicas, os hospitais são estruturados para lidar com uma
                variedade de condições de saúde e emergências. Eles possuem
                departamentos especializados, salas de emergência, unidades de
                internação e instalações para cirurgias complexas. Os hospitais
                têm uma abordagem holística, proporcionando cuidados integrados
                que abrangem múltiplas especialidades. Eles são essenciais para
                casos mais graves, tratamentos prolongados e procedimentos
                cirúrgicos que exigem uma infraestrutura mais ampla.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionSobreTitulo}> 
        <div className={`card ${styles.card}`}> 
          <div className={`card-header ${styles.cardHeader}`}>Especialidades</div> 
          <div className={`card-body ${styles.cardBody}`}> 
            <div className={`blockquote mb-0 ${styles.blockquote}`}> 
              <p>
                Especialidades Médicas: As especialidades médicas referem-se a
                campos específicos da prática médica que se concentram em
                determinados sistemas do corpo humano, tipos de doenças ou
                métodos de tratamento. Cada especialidade tem sua área única de
                expertise, com médicos especialistas que adquirem conhecimento
                avançado e habilidades específicas para diagnosticar, tratar e
                gerenciar condições médicas dentro desse domínio. Algumas das
                principais especialidades médicas incluem cardiologia (doenças
                do coração), dermatologia (doenças da pele), ortopedia (sistema
                musculoesquelético), neurologia (sistema nervoso), entre outras.
                A especialização permite uma abordagem mais aprofundada e eficaz
                no cuidado de pacientes, contribuindo para a diversidade e
                aprofundamento do campo da medicina.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
