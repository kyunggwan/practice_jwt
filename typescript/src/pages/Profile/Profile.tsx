import Authentication from '../Authentication/Authentication';
import ProfileList from './ProfileList/ProfileList';
import { useUserStore } from '../../stores';
import { Typography } from 'antd';
const { Text } = Typography;

export default function Profile() {
const { user } = useUserStore();


  return (
    <div>
      {user ? <ProfileList /> : <Authentication />}
    </div>
  );
}
