import { Loading } from "../common/Loading";
import { Dropdown } from "../common/Dropdown";
import { useUsers } from "../../hooks/ManageUsers";
import { useEffect } from "react";

type Props = {
  userID: string;
  changeUserID: (userID: string) => void;
};

export const UsersDropdown = ({ userID, changeUserID }: Props) => {
  const [users, isLoading] = useUsers();

  useEffect(() => {
    changeUserID(users[0]?.key);
  }, [users]);

  return (
    <Loading isLoading={isLoading}>
      <Dropdown
        value={userID}
        options={users}
        onChange={(e) => changeUserID(e.target.value)}
      />
    </Loading>
  );
};
