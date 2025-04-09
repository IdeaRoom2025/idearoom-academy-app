export default function Headline({ text }) {
  return (
    <div>
      <h2 className="text-[20px] max-sm:text-[19px] text-center leading-[24px] mt-[72px] caps-text font-bold text-secondary-500">
        {text}
      </h2>
    </div>
  );
}
