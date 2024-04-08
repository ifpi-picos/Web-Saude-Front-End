import styles from "@/components/Usuarios/Ver-Mais/css/comentario.module.css"

const Comnetarios = () => {
    return (
        <>
            <div className={styles.background}>
            </div>
            <main className={styles.main}>
                <hr className={styles.line} />
                <div className={styles.containerComments}>
                    <div className={styles.comments}>
                        <div className={styles.photoPerfil}>
                            <img src="image/perfil.png" alt="" />
                        </div>
                        <div className={styles.infoComments}>
                            <div className={styles.header}>
                                <h4>Cristian Cedano</h4>
                                <h5>25 noviembre 2017</h5>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum voluptas reiciendis, hic voluptatibus maxime, delectus fugiat, aspernatur nisi saepe, temporibus nemo sequi sint pariatur ratione! Repellat tempora doloremque illo necessitatibus.</p>
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
                        <img src="image/perfil2.jpg" id="photoSelect" alt="" />
                    </div>
                    <input type="file" id="loadPhoto" />
                    <input type="text" placeholder="Su nombre" />
                </div>
                <textarea className={styles.mensaje} name="" id="" cols="30" rows="10" placeholder="Escriba su mensaje"></textarea>
                <button className={styles.btnComment}>Comentar</button>
            </div>
        </>
    );
}

export default Comnetarios;
