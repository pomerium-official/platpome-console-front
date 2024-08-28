import { useUserInfo } from '@/features/auth/libs/client/use-user-info';
import React, { useEffect, useState } from 'react';

const LeftSite = () => {
  const { data: userInfo } = useUserInfo({ needLogin: true });
  const [initial, setInitial] = useState('');
  useEffect(() => {
    setInitial(userInfo?.email.substring(0, 1).toLowerCase() as string);
  }, []);
  return (
    <div className="leftSite">
      <div className="email">
        <i
          style={
            /^[a-z]/.test(initial)
              ? {
                  backgroundImage: `url(/assets/images/initial/initial-${userInfo?.email
                    .substring(0, 1)
                    .toLowerCase()}.svg)`,
                }
              : {}
          }
        >
          {!/^[a-z]/.test(initial) ? initial : ''}
        </i>
        {userInfo?.email}
      </div>
      <h1>
        Welcome! <span className="gradient">PomeriumX Console</span>
      </h1>
      <p>
        Create a developer account <br />
        to create a new game ecosystem with PomeriumX Console!
      </p>
      <div className="bgDiv" />
    </div>
  );
};

export default LeftSite;
