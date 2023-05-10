import Authentication from '../Authentication/Authentication';
import ProfileList from './ProfileList/ProfileList';
import { useUserStore } from '../../stores';

export default function Profile() {
const { user } = useUserStore();

  return (
    <div>
      {user ? <ProfileList /> : <Authentication />}
    </div>
  );
}
