import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import { Loop } from "../../models/Track";
import DefaultButton from "../../widgets/buttons/DefaultButton";

// import "./LoopTrackListItem.scss";

type LoopTrackListItemProps = {
  loop: Loop
};


function createHowl(fileSource: string, volume: number) {
  const sources = [
    `http://phanary.com/audio/converted/${fileSource}.webm`,
    `http://phanary.com/audio/converted/${fileSource}.mp3`
  ];
  // TODO: start it at volume zero and transition up to `volume`
  return new Howl({
    src: sources,
    autoplay: true,
    loop: true,
    volume: volume
  });
}

export default function LoopTrackListItem({ loop }: LoopTrackListItemProps) {
  const { trackMetadata, volume, fileSource } = loop;
  // TODO: extract to LoopTrackListItem
  const [ sound, setSound ] = useState<Howl | null>(null)
  useEffect(() => {
    setSound(createHowl(fileSource, volume));
    return () => {
      if (sound !== null) {
        // TODO: fade out
        sound.unload();
      }
    }
    // This effect should only run once for each track item
    // eslint-disable-next-line
  }, []);
  function displaySource() {
    console.log('TODO');
  }
  function toggleMuted() {
    console.log('TODO');
  }
  function toggleIsPlaying() {
    console.log('TODO');
  }
  function remove() {
    console.log('TODO');
  }
  return (
    <div>
      <p>{trackMetadata.name}</p>
      {/* TODO: volume slider */}
      <DefaultButton
        onClick={toggleMuted}
        text="toggle mute"
      />
      <DefaultButton
        onClick={toggleIsPlaying}
        text="toggle playing"
      />
      <DefaultButton
        onClick={displaySource}
        text="source"
      />
      <DefaultButton
        onClick={remove}
        text="x"
      />
    </div>
  );
}