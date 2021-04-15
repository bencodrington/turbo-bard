import React from "react";

import kofiIcon from "../assets/ko-fi-icon.png";
import githubIcon from "../assets/github-icon.png";
import backIcon from "../assets/icon-back.svg";

import "./AboutPage.scss";
import AnchorButton from "../widgets/buttons/AnchorButton";
import DefaultButton from "../widgets/buttons/DefaultButton";

type AboutPageProps = {
  closeAboutPage: () => void;
};

export default function AboutPage({ closeAboutPage }: AboutPageProps) {
  return (
    <div className="about-page-container">
      <section>
        <h4>Music and effects at the speed of sound.</h4>
        <p>
          Spice up your&nbsp;
          <a href="https://en.wikipedia.org/wiki/Tabletop_role-playing_game"
            target="_blank"
            rel="noopener noreferrer">
            tabletop RPG
          </a>
          &nbsp;games and boost player immersion.
        </p>
        <ul>
          <li>Fade seamlessly between groups of sounds</li>
          <li>Search hundreds of sounds</li>
          <li>Improvise with ease when the party goes somewhere unexpected</li>
        </ul>
      </section>
      <section>
        <h4>Always leveling up.</h4>
        <p>
          Please send any feedback, bugs, or ideas to &nbsp;
          <a href="mailto:phanarydev@gmail.com"
            target="_blank"
            rel="noopener noreferrer">
            phanarydev@gmail.com
          </a>
          .
        </p>
        <p>
          I built TurboBard to add some juice to my games and
          I hope it helps you too! The tool is 100% free to use.
          If you'd like, you can&nbsp;
          <a href="https://ko-fi.com/projectbench"
            target="_blank"
            rel="noopener noreferrer">
            donate
          </a>
          &nbsp;to help cover the costs of running it.
        </p>
        <div className="button-group">
          <AnchorButton
            className="ko-fi-button"
            url="https://ko-fi.com/projectbench"
            icon={kofiIcon}
            iconAltText="Ko-Fi logo"
            text="Support me"
          />
          <AnchorButton
            className="github-button"
            url="https://github.com/bencodrington/turbo-bard"
            icon={githubIcon}
            iconAltText="GitHub logo"
            text="Code"
          />
        </div>
        <p>
          Upcoming features:
        </p>
        <ul>
          <li>Upload your own sounds</li>
          <li>Online multiplayer</li>
        </ul>
      </section>
      <section>
        <h4>About the audio.</h4>
        <p>
          I’ve collected sounds from across the Internet with
          permissive licenses to use them here.
          I’ve linked the source and listed the author wherever
          possible.
        </p>
        <p>
          If TurboBard features your sound and you’d like it
          to be removed or modified for any reason,
          please don’t hesitate to contact me at&nbsp;
          <a href="mailto:phanarydev@gmail.com"
            target="_blank"
            rel="noopener noreferrer">
            phanarydev@gmail.com
          </a>
          .
        </p>
      </section>
      <section>
        <h4>Data policy.</h4>
        <p>
          TurboBard doesn't use any cookies.
          No personal data is recorded at any time.
        </p>
      </section>
      <section>
        <DefaultButton
          icon={backIcon}
          text="Back"
          iconAltText="Back arrow"
          onClick={closeAboutPage}
        />
      </section>
    </div>
  );
}