import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../models/Track";
import DefaultButton from "../../widgets/buttons/DefaultButton";
import { removeTrack } from "../../slices/soundscapes";

// import "./LoopTrackListItem.scss";

type LoopTrackListItemProps = {
  loop: Loop,
  soundscapeIndex: number,
  isVisible: boolean
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

export default function LoopTrackListItem({ soundscapeIndex, loop, isVisible }: LoopTrackListItemProps) {
  const { trackMetadata, volume, fileSource } = loop;
  const [sound, setSound] = useState<Howl | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const howl = createHowl(fileSource, volume);
    setSound(howl);
    return () => {
      // TODO: fade out
      howl.unload();
    }
    // This effect should only run once for each track item
    // eslint-disable-next-line
  }, []);
  if (!isVisible) {
    return null;
  }
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
    dispatch(removeTrack({ soundscapeIndex, trackIndex: loop.index }))
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