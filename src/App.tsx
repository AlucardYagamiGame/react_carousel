import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const LIMITS: Record<string, { min: number; max: number }> = {
  itemWidth: { min: 10, max: 1000 },
  frameSize: { min: 1, max: 10 },
  step: { min: 1, max: 10 },
  animationDuration: { min: 0, max: 10000 },
};

class App extends React.Component<{}, State> {
  state: State = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // prettier-ignore
    this.setState({
      [name]: Number(value),
    } as unknown as Pick<
    State,
    'itemWidth' | 'frameSize' | 'step' | 'animationDuration'
    >);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title">
          Carousel with {images.length} images
        </h1>
        <div className="App__settings">
          <label className="App__label" htmlFor="itemId">
            Item Width (px):
            <input
              id="itemId"
              type="number"
              name="itemWidth"
              value={itemWidth}
              min={LIMITS.itemWidth.min}
              max={LIMITS.itemWidth.max}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="frameId">
            Frame Size (items):
            <input
              id="frameId"
              type="number"
              name="frameSize"
              value={frameSize}
              min={LIMITS.frameSize.min}
              max={LIMITS.frameSize.max}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              name="step"
              value={step}
              min={LIMITS.step.min}
              max={LIMITS.step.max}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
          <label className="App__label" htmlFor="durationId">
            Animation Duration (ms):
            <input
              id="durationId"
              type="number"
              name="animationDuration"
              value={animationDuration}
              min={LIMITS.animationDuration.min}
              max={LIMITS.animationDuration.max}
              onChange={this.handleInputChange}
              className="App__input"
            />
          </label>
        </div>

        <div className="App__carousel-wrapper">
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
