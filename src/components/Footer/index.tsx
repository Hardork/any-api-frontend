import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '老山羊出品';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Hardork',
          blankTarget: true,
        },
        {
          key: 'Goat API',
          title: 'Hardork',
          href: 'https://github.com/Hardork',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
