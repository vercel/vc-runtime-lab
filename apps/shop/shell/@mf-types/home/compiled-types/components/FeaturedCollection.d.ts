interface Props {
    title: string;
    subtitle?: string;
    href: string;
    image: string;
    dark?: boolean;
}
export default function FeaturedCollection({ title, subtitle, href, image, dark }: Props): import("react").JSX.Element;
export {};
