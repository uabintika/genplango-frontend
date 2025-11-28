import * as React from "react";
import { useTranslations } from "next-intl";
import { TableFilters } from "./table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PlusCircle, SearchIcon } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import Link from "next/link";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";

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
    <>
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <InputGroup>
          <InputGroupInput
            name="search"
            placeholder={t("search")}
            disabled={isLoading || isValidating}
            onChange={debounceSearch}
          />
          <InputGroupAddon align="inline-end">
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="px-5 pb-5">
        <Button asChild color="success" size="md">
          <Link href={ROUTES.ADMIN.SERVICE_RECIPIENTS.CREATE}>
            <span>Sukurti klientą</span>
            <PlusCircle className="ms-1" />
          </Link>
        </Button>
      </div>
    </>
  );
}
