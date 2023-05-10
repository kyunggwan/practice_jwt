import Authentication from '../Authentication/Authentication';
import MyProfile from "./MyProfile/MyProfile";
import { useUserStore } from '../../stores';

export default function Profile() {
const { user } = useUserStore();

  return <div>{user ? <MyProfile /> : <Authentication />}</div>;
}
