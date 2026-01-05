import * as React from 'react';
import Container from '../../ui/Container/Container';
import SearchInput from '../../ui/SearchInput/SearchInput';
import classes from './Header.module.scss';
import config from '../../../config';
import { Logo } from '../../ui/Logo/Logo';
import { FaInstagram, FaTelegram, FaVk, FaPhone } from 'react-icons/fa';

type IconComponent = React.FC<{ className?: string; size?: number }>;

const iconMap: Record<string, IconComponent> = {
  instagram: FaInstagram as IconComponent,
  telegram: FaTelegram as IconComponent,
  vk: FaVk as IconComponent,
};

const PhoneIcon = FaPhone as IconComponent;

const SocialIcon: React.FC<{ name: string; className?: string; size?: number }> = ({ name, className, size }) => {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
};

const Header: React.FC = () => {
  return (
    <>
      <header className={classes.mobileHeader}>
        <Container>
          <div className={classes.mobileHeaderTop}>
            <Logo />
            <div className={classes.mobileIconsContainer}>
              {config.socialMedia && config.socialMedia.map((social, index) => (
                <a key={index} href={social.href}>
                  <SocialIcon name={social.name} className={classes.mainIcon} size={21} />
                </a>
              ))}
              <a href={`tel:+${config.contact.phone.value}`}>
                <PhoneIcon className={classes.mainIcon} size={21} />
              </a>
            </div>
          </div>
          <div className={classes.mobileHeaderSearch}>
            <SearchInput />
          </div>
        </Container>
      </header>
      <header className={classes.desktopHeader}>
        <Container>
          <div className={classes.headerContent}>
            <Logo />
            <SearchInput />
            <div className={classes.iconsContainer}>
              {config.socialMedia && config.socialMedia.map((social, index) => (
                <a key={index} href={social.href}>
                  <SocialIcon name={social.name} className={classes.mainIcon} size={21} />
                </a>
              ))}
              <a href={`tel:+${config.contact.phone.value}`}>
                <PhoneIcon className={classes.mainIcon} size={21} />
              </a>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
