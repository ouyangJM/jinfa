// interface ErrorMessageProps {
//   readonly text: string;
// }

export default function ErrorMessage({ text }) {
  return (
    <div className="text-1-4 sm:text-1-2 text-red leading-normal pt-1 ">
      {text}
    </div>
  );
}
