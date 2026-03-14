import * as Dialog from "@radix-ui/react-dialog";
import { CartButton } from "../cartButton/CartButton";
import { CartClose, CartContent } from "./styles";
import { X } from "phosphor-react";

interface CartProps {
  // adicione suas props aqui
}

export function Cart(props: CartProps) {
  return (
    <Dialog.Root onOpenChange={(open) => console.log("O Dialog abriu?", open)}>
      {/* <Dialog.Trigger asChild>
        <CartButton />  
      </Dialog.Trigger> */}
      <Dialog.Trigger>
        <button type="button">Abrir teste</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold"/>
          </CartClose>

          <h2>Sacola de compras</h2>


          <section>
            <p>Parece que seu carrinho está vazio : (</p>
          </section>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}