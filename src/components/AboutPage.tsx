import React from "react";

import kofiIcon from "../assets/ko-fi-icon.png";
import githubIcon from "../assets/github-icon.png";
import backIcon from "../assets/icon-back.svg";

import "./AboutPage.scss";
import AnchorButton from "../widgets/buttons/AnchorButton";
import DefaultButton from "../widgets/buttons/DefaultButton";
import AppHeader from "../widgets/AppHeader";
import Button from "../widgets/buttons/Button";

type AboutPageProps = {
  closeAboutPage: () => void;
};

export default function AboutPage({ closeAboutPage }: AboutPageProps) {
  return (
    <div className="about-page-container">
      <AppHeader
        isAboutOpen={true}
        setIsAboutOpen={closeAboutPage}
      />
      <main>
        <section>
          <h4>Music and effects at the speed of sound.</h4>
          <p>
            Spice up your <a href="https://en.wikipedia.org/wiki/Tabletop_role-playing_game"
              target="_blank"
              rel="noopener noreferrer">
              tabletop RPG
            </a> games and boost player immersion.
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
            Please send any feedback, bugs, or ideas to <a href="mailto:phanarydev@gmail.com"
              target="_blank"
              rel="noopener noreferrer">
              phanarydev@gmail.com
            </a>
            .
          </p>
          <AnchorButton
            className="github-button"
            url="https://github.com/bencodrington/turbo-bard"
            icon={githubIcon}
            iconAltText="GitHub logo"
            text="Code"
          />
          <p>
            If you'd like, you can <a href="https://ko-fi.com/projectbench"
              target="_blank"
              rel="noopener noreferrer">
              donate
            </a> to help cover the costs of running TurboBard.
          </p>
          <AnchorButton
            className="ko-fi-button"
            url="https://ko-fi.com/projectbench"
            icon={kofiIcon}
            iconAltText="Ko-Fi logo"
            text="Support me"
          />
          <p>
            Recent changes:
          </p>
          <ul>
            <li>Redesign to make the interface easier to learn, and faster to switch between groups during a game session</li>
          </ul>
          <p>
            Upcoming features:
          </p>
          <ul>
            <li>Use sounds from your own device</li>
          </ul>
        </section>
        <section>
          <h4>About the audio.</h4>
          <p>
            I’ve collected sounds from across the Internet with
            permissive licenses.
            I’ve linked the source and listed the author wherever
            possible.
          </p>
          <p>
            If TurboBard features your sound and you’d like it
            to be removed or modified for any reason,
            please contact me at <a href="mailto:phanarydev@gmail.com"
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
          <Button
            text="Back"
            onClick={closeAboutPage}
          />
        </section>
      </main>
    </div>
  );
}