import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowButton";
import "./embla.css";
import Item from "./Item";

const EmblaCarousel = (props) => {
  const { slides, options, clickIndex } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla w-full">
      <div className="embla__viewport w-full" ref={emblaRef}>
        <div className="embla__container w-full">
          {slides.map((i,index) => {
            return (
              <Item item={i} key={index} clickIndex={clickIndex} />
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default EmblaCarousel;
