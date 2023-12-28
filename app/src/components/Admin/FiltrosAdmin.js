"use client";
import Link from "next/link";
import { Button, ButtonGroup } from "react-bootstrap";
import styles from "@/components/Admin/css/FiltrosAdmin.module.css";

export default function FiltrosAdmin() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="mt-4 mb-2">
        <ButtonGroup className={styles.buttonGroup}>
          <Link href="/dashboard/unidades-de-saude/clinicas">
            <Button variant="primary">Clínicas</Button>
          </Link>
          <Link href="/dashboard/unidades-de-saude/hospitais">
            <Button variant="success">Hospitais</Button>
          </Link>
          <Link href="/dashboard/unidades-de-saude/pedidos">
            <Button variant="danger">Pedidos</Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
}
