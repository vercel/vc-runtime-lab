import type { CartItem } from '@shop/api-client';
interface Props {
    items?: CartItem[];
    showCheckoutButton?: boolean;
}
export default function CartSummary({ items: propItems, showCheckoutButton }: Props): Promise<import("react").JSX.Element>;
export {};
