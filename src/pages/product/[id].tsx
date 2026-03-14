import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "../../../node_modules/next/router";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import { ProductsResponse } from "../../model/products";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";


interface ProductProps {
  product: ProductsResponse,
}

export default function Product({product}: ProductProps) {

  const [isCreatingCheckoutSetion, setIsCreatingCheckoutSetion] = useState(false);

  async function handleByProduct() {
    try {
      setIsCreatingCheckoutSetion(true);
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      });
      const { checkoutURL } = response.data;
      window.location.href = checkoutURL
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckoutSetion(false);
      alert('Falha ao redirecionar ao checkout');
    }

    
  }

  const { isFallback } = useRouter();

  if(isFallback) {
    return <p>Loading ...</p>
  }  

  return (

    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image  src={product.imageUrl} width={520} height={400} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
        
          <button disabled={isCreatingCheckoutSetion} onClick={handleByProduct}>Comprar agora</button>

        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [
      {params: {id: 'prod_TsXgUhOUDHOdBo'}}
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({params}) => {

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price
    

  return {
    props: {
      product : {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }

    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}