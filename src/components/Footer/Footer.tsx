import React, { FC } from 'react';
import { shell } from 'electron';
import config from '../../../app.config'

import instagramIcon from '../../images/instagram.svg';
import discordIcon from '../../images/discord.svg';
import githubIcon from '../../images/github.svg';
import aboutIcon from '../../images/about.svg';

const Footer: FC = () => {

  const commonCss = `w-12 h-12 m-4 transition duration-500 ease-in-out transform hover:scale-150 text-center text-xs font-medium`;
  // const commonCssText = ``;

  return (
    <div className="flex flex-row justify-center items-center">

      <a href="#" className={`${commonCss} footerimg`}>
        <img
          src={aboutIcon}
          onClick={e => shell.openExternal(config.aboutMe.portfolio)}
        />
        <p className="footertext">About Me</p>
      </a>
      
      <a href="#" className={`${commonCss} footerimg`}>
        <img
          src={githubIcon}
          onClick={e => shell.openExternal(config.aboutMe.github)}
        />
        <p className="footertext">My Github</p>
      </a>
         
      <a href="#" className={`${commonCss} footerimg`}>
        <img
          src={discordIcon}
          onClick={e => shell.openExternal(config.aboutMe.discord)}
        />
        <p className="footertext">My Discord</p>
      </a>
      
      <a href="#" className={`${commonCss} footerimg`}>
        <img
          src={instagramIcon}
          onClick={e => shell.openExternal(config.aboutMe.instagram)}
        />
        <p className="footertext">My Insta</p>
      </a>
     
    </div>
  )
}

export default Footer