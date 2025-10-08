import * as React from "react";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { TableFilters } from "./table";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";

type TableFiltersProps = {
  isLoading: boolean;
  isValidating: boolean;
  setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
};

export default function ServiceRecipientTableFilters({
  isLoading,
  isValidating,
  setFilters,
}: TableFiltersProps) {
  const t = useTranslations("Table");
  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const val = e.target.value;
      setFilters((prev) => ({ ...prev, [name]: val }));
    },
    []
  );
  const debounceSearch = useDebounce(onInputChange, 500);

  return (
    <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <InputGroup>
        <Input
          name="search"
          placeholder={t("search")}
          disabled={isLoading || isValidating}
          onChange={(e) => debounceSearch(e)}
        />
        <InputGroupText>
          <SearchIcon className="w-5 h-5" />
        </InputGroupText>
      </InputGroup>
    </div>
  );
}
