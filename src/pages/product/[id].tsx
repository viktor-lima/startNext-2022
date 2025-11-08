import { useRouter } from "../../../node_modules/next/router";


interface productProps {
  // adicione suas props aqui
}

export default function Product(props: productProps) {

  const { query } = useRouter()

  return (
    <h1>
      Product: {JSON.stringify(query)}
    </h1>
  );
}