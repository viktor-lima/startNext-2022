import { useRouter } from "../../../node_modules/next/router";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";


interface productProps {
  // adicione suas props aqui
}

export default function Product(props: productProps) {

  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda sit porro quis ab dolorum asperiores non doloribus, veniam facilis repellat maxime, odit vel alias ut possimus dicta optio hic accusantium.</p>
      
        <button>Comprar agora</button>

      </ProductDetails>
    </ProductContainer>
  );
}