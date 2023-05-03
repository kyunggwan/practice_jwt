import Authentication from '../Authentication/Authentication';
import ProfileList from './ProfileList/ProfileList';
import { useUserStore } from '../../stores';

export default function Profile() {
const { user } = useUserStore();


  return (
    <div>
      profile 로그인을 해야 볼 수 있는 게시판이다. 로그인이 되면 회원 목록을, 로그인이 안되면 로그인 창을 보여준다
      {user ? <ProfileList /> : <Authentication />}
    </div>
  );
}
