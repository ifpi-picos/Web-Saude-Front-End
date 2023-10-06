import "../Usuarios/css/CardInformativo.css";
import Link from "next/link";
import Image from "next/image";
import Clinica from "@/services/Clinica";

export default async function CardInformativo({ nome }) {
  const clinica = await Clinica.pegarClinica(nome)
  return (
    <div class="container">
<div class="row">
<div class="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center">
<div class="row">
<div class="col-lg-12 col-sm-12 col-12 profile-header"></div>
</div>
<div class="row user-detail">
<div class="col-lg-12 col-sm-12 col-12">
<img src="/demo/man01.png" class="rounded-circle img-thumbnail"/>
<h5>John Addison</h5>
<p><i class="fa fa-map-marker" aria-hidden="true"></i> New Jersey, USA.</p>
<hr/>
<a href="#" class="btn btn-success btn-sm">Follow</a>
<a href="#" class="btn btn-info btn-sm">Send Messege</a>
<hr/>
<span>Lorem ips consectetur adipisium ,eiusmod tempor incididuin reprehendeanim.</span>
</div>
</div>
<div class="row user-social-detail">
<div class="col-lg-12 col-sm-12 col-12">
<a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
<a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
<a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
</div>
</div>
</div>
</div>
</div>
  );
}
