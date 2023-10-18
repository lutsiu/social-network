import { useSelector } from "react-redux";
import { UserType } from "../../../interfaces/models";
import Wrapper from "../../Wrappers/RightMenusWrapper";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { ReduxState } from "../../../interfaces/redux";
export default function WhoToFollow() {
  const [users, setUsers] = useState<null | UserType[]>(null);
  const myUser = useSelector((state: ReduxState) => state.auth.user);

  useEffect(() => {
    async function getUsers(): Promise<void> {
      try {
        const res = await fetch(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `http://localhost:3000/profile/users/${myUser?._id}`
        );
        if (!res.ok) return;
        const foundUsers = await res.json() as UserType[];
        setUsers(foundUsers);
      } catch (err) {
        console.log(err);
      }
    }
    void getUsers();
  }, [myUser]);



  return (
    <Wrapper title="Who to follow">
      <ul className="mt-[1rem]">
        {users && users.length > 0 && users.map((user, i) => {
          return <Profile key={i} user={user} />
        })}        
      </ul>
    </Wrapper>
  );
}
