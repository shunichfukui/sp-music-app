import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchInputProps } from '../types';

export function SearchInput(props: SearchInputProps) {
  const { handleInputChange, onSubmit } = props;

  return (
    <section className="mb-10 flex w-full">
      <input
        onChange={handleInputChange}
        onBlur={() => onSubmit()}
        className="bg-gray-700 w-full md:w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲を入力してください"
      />
      <button
        onClick={() => onSubmit()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
