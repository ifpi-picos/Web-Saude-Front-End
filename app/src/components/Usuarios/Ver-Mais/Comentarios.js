import styles from "@/components/Usuarios/Ver-Mais/css/comentario.module.css";

const Comentarios = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.containerComments}>
          <div className={styles.comments}>
            <div className={styles.photoPerfil}>
              <img src="/imgs/logo-icon-1.png" alt="logo" />
            </div>
            <div className={styles.infoComments}>
              <div className={styles.header}>
                <h4>Eric Santos</h4>
                <h5>01 Fevereiro 1998</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
                voluptas reiciendis, si saepe, temporibus nemo sequi sint
                pariatur ratione! Repellat tempora doloremque illo
                necessitatibus.
              </p>
              <div className={styles.footer}>
                <h5 className={styles.request}>Responder</h5>
                <label className={styles.iconHeart}></label>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className={styles.capaData}></div>
      <div className={styles.containerData}>
        <div className={styles.photoInput}>
          <div className={styles.perfilPhoto}>
            <img  id="photoSelect" alt="#" />
          </div>
          <input type="file" id="loadPhoto" />
          <input type="text" placeholder="Seu nome" />
        </div>
        <textarea
          className={styles.mensaje}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Escreva mensagem"
        ></textarea>
        <button className={styles.btnComment}>Comentar</button>
      </div>
    </>
  );
};

export default Comentarios;
