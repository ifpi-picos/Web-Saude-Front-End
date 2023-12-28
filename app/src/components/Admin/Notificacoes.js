import React from "react";
import styles from "@/components/Admin/css/Notificacoes.module.css";
import Image from "next/image";

export default function PageNotificacoes() {
  return (
    <section className={styles.sectionNotificacoes}>
      <main className={styles.container}>
        <div className={styles.panel}>
          <h1>
            Notifications <button id={styles.number}></button>
          </h1>
          <button className={styles.panelButton}>Mark all as read</button>
        </div>

        <div className={`${styles.notification} ${styles.new}`}>
          <div className={styles.block}>
            <Image
              src="/assets/images/avatar-mark-webber.webp"
              alt="MarkWebber avatar"
              width={40}
              height={40}
            />
            <div className={styles.description}>
              <p className={styles.message}>
                <span className={styles.name}>Mark Webber</span> reacted to your
                recent post
                <span className={styles.article}>
                  My first tournament today!
                </span>
                <button className={styles.circle}></button>
              </p>
              <p className={styles.time}>1m ago</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
