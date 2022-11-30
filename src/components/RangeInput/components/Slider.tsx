import React, { FC, useCallback, useMemo } from 'react';
import ReactSlider from 'react-slider';

import style from './slider.module.scss';

type SliderProps = {
  currentMin: number | undefined;
  currentMax: number | undefined;
  max: number;
  min: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
};

export const Slider: FC<SliderProps> = ({ currentMax, currentMin, max, min, onMaxChange, onMinChange }) => {
  const rangeSliderValue = useMemo(() => [currentMin || min, currentMax || max], [currentMax, currentMin, max, min]);
  const renderThumb = useCallback((props) => <div {...props}></div>, []);

  const renderTrack = useCallback(
    (props, state) => <div {...props} className={`${style.track} ${style[`track-${state.index}`]}`}></div>,
    [],
  );

  const onChange = useCallback(
    ([newMin, newMax]) => {
      if (newMin !== currentMin) {
        onMinChange(newMin);
      }
      if (newMax !== currentMax) {
        onMaxChange(newMax);
      }
    },
    [currentMax, currentMin, onMaxChange, onMinChange],
  );

  return (
    <ReactSlider
      className={style.range}
      thumbClassName={style.thumb}
      trackClassName={style.track}
      renderTrack={renderTrack}
      value={rangeSliderValue}
      max={max}
      min={min}
      pearling
      minDistance={10}
      onChange={onChange}
      renderThumb={renderThumb}
    />
  );
};
