interface TitleSectionProps {
  size: 'h1' | 'h2';
  text: string;
}
const TitleSection = ({ size, text }: TitleSectionProps) => {
  const textSize = size === 'h1' ? 'text-heading1 m-0 ' : 'text-heading2 m-0';
  return <div className={`${textSize} font-display`}> {text}</div>;
};
export default TitleSection;
