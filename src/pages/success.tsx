import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface successProps {
  // adicione suas props aqui
}

export default function Success(props: successProps) {
  return (
    <SuccessContainer>
      <h1>Compra Efetuada</h1>

      <ImageContainer>

      </ImageContainer>

      <p>
        Uhuul <strong>Diego Fernandes</strong> , sua <strong> Camiseta Beyond the Limits</strong> já está a caminho da sua casa.  
      </p>

      <Link href="/">
        Voltar ao catalogo
      </Link>
    </SuccessContainer>
  );
}