import * as React from 'react';
import Container from '../../ui/Container/Container';
import SearchInput from '../../ui/SearchInput/SearchInput';
import classes from './Header.module.scss';
import config from '../../../config';
import { Logo } from '../../ui/Logo/Logo';
import { FaInstagram, FaTelegram, FaVk, FaPhone } from 'react-icons/fa';

const iconMap = {
  instagram: FaInstagram,
  telegram: FaTelegram,
  vk: FaVk,
};

const Header: React.FC = () => {
  return (
    <>
      <header className={classes.mobileHeader}>
        <Container>
          <div className={classes.mobileHeaderTop}>
            <Logo />
            <div className={classes.mobileIconsContainer}>
              {config.socialMedia && config.socialMedia.map((social, index) => {
                const Icon = iconMap[social.name as keyof typeof iconMap];
                return (
                  <a key={index} href={social.href}>
                    <Icon className={classes.mainIcon} size={21} />
                  </a>
                );
              })}
              <a href={`tel:+${config.contact.phone.value}`}>
                <FaPhone className={classes.mainIcon} size={21} />
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
              {config.socialMedia && config.socialMedia.map((social, index) => {
                const Icon = iconMap[social.name as keyof typeof iconMap];
                return (
                  <a key={index} href={social.href}>
                    <Icon className={classes.mainIcon} size={21} />
                  </a>
                );
              })}
              <a href={`tel:+${config.contact.phone.value}`}>
                <FaPhone className={classes.mainIcon} size={21} />
              </a>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
