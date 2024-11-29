import { DropdownOption } from "../components/common/Dropdown";
import { useState } from "react";
import { getUsers } from "../api/users";
import { useEffect } from "react";
import { User } from "../types/Users";

export const useUsers = (): [DropdownOption[], boolean] => {
  const [ingredients, setIngredients] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const usersAPIResponse = await getUsers();
    const usersForDropdown: DropdownOption[] = usersAPIResponse.map(
      (user: User) => {
        return {
          key: user.id,
          value: user.name,
        };
      }
    );
    setIngredients(usersForDropdown);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
    setIsLoading(false);
  }, []);

  return [ingredients, isLoading];
};
