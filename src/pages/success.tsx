import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { ProductsResponse } from "../model/products";
import Image from "next/image";
import Head from "next/head";

interface successProps {
  custumerName: string;
  product: ProductsResponse,
}

export default function Success({ custumerName, product }: successProps) {
  return (

    <>
      <Head>
        <title>Compra Efetuada| Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
    
      <SuccessContainer>
        <h1>Compra Efetuada</h1>

        <ImageContainer>
          <Image  src={product.imageUrl} width={120} height={110} alt=""/>
        </ImageContainer>

        <p>
          Uhuul <strong>{custumerName}</strong> , sua <strong>{product.name}</strong> já está a caminho da sua casa.  
        </p>

        <Link href="/">
          Voltar ao catalogo
        </Link>
      </SuccessContainer>
    
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if(!query.sessionId) {
    return {
     redirect : {
      destination: '/',
      permanent: false,
     }
    }
  }

  const sessionId = String(query.session_id);


  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });
  const custumerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;
  

  return {
    props : {
      custumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    }
  }

}