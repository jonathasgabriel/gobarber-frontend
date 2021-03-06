import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';
import Notification from '~/components/Notifications';
import logo from '~/assets/logo-purple.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard"> Dashboard</Link>
        </nav>

        <aside>
          <Notification />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            {profile.avatar && (
              <img
                src={
                  profile.avatar.url ||
                  'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt="adorable-io"
              />
            )}
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
