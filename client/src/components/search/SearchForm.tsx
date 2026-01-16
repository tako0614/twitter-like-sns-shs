/**
 * 検索フォームコンポーネント
 * 検索入力フォームのみを担当（プレゼンテーショナル）
 */

interface SearchFormProps {
  searchWord: string;
  onSearchWordChange: (word: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

/**
 * 検索フォーム
 */
const SearchForm = ({
  searchWord,
  onSearchWordChange,
  onSubmit,
  isLoading,
}: SearchFormProps) => {
  return (
    <div className="mb-4 bg-gray-800 p-2 rounded-md">
      <form onSubmit={onSubmit} className="w-full">
        <input
          className="w-full bg-gray-900 p-4 rounded-md text-white"
          placeholder="検索"
          value={searchWord}
          onChange={(e) => onSearchWordChange(e.target.value)}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default SearchForm;
