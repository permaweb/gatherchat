import { Button } from "@/components/ui/button";
import { toTitleCase } from "@/utils";
import { useCallback, useMemo, useState } from "react";
import { AvatarStandalone } from "../../avatar/components/AvatarStandalone";
import { serialize } from "../../avatar/lib/edit";
import { deserialize } from "../../avatar/lib/generate";
import {
  SHAPE_OPTIONS,
  colorCategories,
  colorThemes,
} from "../../avatar/lib/shared";
import OptionSlider from "./OptionSlider";

interface CharacterCreatorProps {
  initialSeed?: string;
  onSeedChange?: (seed: string) => void;
}

const colorMaxs = colorCategories.map(
  (category) =>
    // biome-ignore lint/style/noNonNullAssertion: Static analysis
    colorThemes.find((theme) => theme.key === category)!.options.length,
);

export const CharacterCreator = ({
  initialSeed,
  onSeedChange,
}: CharacterCreatorProps) => {
  const initialValues = useMemo(() => {
    if (initialSeed) return deserialize(initialSeed);
    return Array(SHAPE_OPTIONS.length + colorCategories.length).fill(0);
  }, [initialSeed]);

  const [faceIndex, setFaceIndex] = useState(initialValues[0]);
  const [headIndex, setHeadIndex] = useState(initialValues[1]);

  const [colorIndicies, setColorIndicies] = useState(initialValues.slice(2));

  const currentSeed = useMemo(() => {
    const seed = serialize([faceIndex, headIndex, ...colorIndicies]);
    onSeedChange?.(seed);
    return seed;
  }, [faceIndex, headIndex, colorIndicies, onSeedChange]);

  const randomize = useCallback(() => {
    setFaceIndex(Math.floor(Math.random() * SHAPE_OPTIONS[0].max));
    setHeadIndex(Math.floor(Math.random() * SHAPE_OPTIONS[1].max));
    setColorIndicies(colorMaxs.map((max) => Math.floor(Math.random() * max)));
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <AvatarStandalone
          scale={8}
          seed={currentSeed}
          animationName={"idle"}
          isPlaying={true}
        />
        <Button
          type="button"
          onClick={randomize}
          className="opacity-60 hover:opacity-100"
        >
          <img
            src="./assets/dice.png"
            alt="Gather Chat logo"
            className="w-20"
          />
        </Button>
      </div>
      <div>
        <div>
          <OptionSlider
            label={"Face"}
            valueCount={SHAPE_OPTIONS[0].max}
            value={faceIndex}
            onChange={setFaceIndex}
          />
          <OptionSlider
            label={"Head"}
            valueCount={SHAPE_OPTIONS[1].max}
            value={headIndex}
            onChange={setHeadIndex}
          />
        </div>
        <div>
          {colorCategories.map((category, index) => {
            if (category === "item") return null;
            return (
              <OptionSlider
                key={category}
                label={`${toTitleCase(category)} color`}
                valueCount={colorMaxs[index]}
                value={colorIndicies[index]}
                onChange={(value) => {
                  const newColorIndicies = [...colorIndicies];
                  newColorIndicies[index] = value;
                  setColorIndicies(newColorIndicies);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
