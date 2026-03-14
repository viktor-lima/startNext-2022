import { HeaderContainter } from "./styles";
import Image from "next/image"

import logoImg from '../../assets/logo.svg'
import { CartButton } from "../cartButton/CartButton";


interface HeaderProps {
  // adicione suas props aqui
}

export function Header(props: HeaderProps) {
  return (
    <HeaderContainter>
      <Image src={logoImg} alt="" />
      <CartButton />
    </HeaderContainter>
  );
}