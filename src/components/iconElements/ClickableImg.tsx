type Props = {
  url: string;
  imgSrc: string;
  altText?: string;
};

export default function ClickableImage(props: Props) {
  const openPage = () => {
    window.open(props.url, "_blank", "noopener,noreferrer");
  };

  return (
    <img
      src={props.imgSrc}
      alt={props.altText}
      className="cursor-pointer h-icon-m"
      onClick={openPage}
    />
  );
}
