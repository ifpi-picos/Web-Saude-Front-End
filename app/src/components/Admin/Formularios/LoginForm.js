import { FaHome } from "react-icons/fa";
import Link from "next/link";
import "@/components/Admin/Formularios/css/Form.css";

export default function LoginForm(){
    return(
        <section style={{marginTop:"0px"}}>
        <div className="painel">
          <h3>
            <Link href="/">
              <FaHome size={24} />Home
            </Link>
          </h3>
        </div>
        <div className="box">
          <legend>
            <strong>Login</strong>
          </legend>
          <form>
            <div className="inputBox">
              <label className="labelInput" htmlFor="email">Email:</label>
              <input className="inputUser"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
  
            <div className="inputBox">
              <label className="labelInput" htmlFor="senha">Senha:</label>
              <input className="inputUser"
                type="password"
                id="senha"
                name="senha"
                required
              />
            </div>
  
            <button id="submit" type="submit">Entrar</button>
          </form>
        </div>
      </section>
    )
}