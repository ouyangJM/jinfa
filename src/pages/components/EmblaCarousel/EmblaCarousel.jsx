import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowButton";
import "./embla.css";
import Item from "./Item";

const EmblaCarousel = (props) => {
  const { slides, options, clickIndex ,setClickIndex,setClickDate,chooseDate,clickDate} = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);


  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla flex">
      <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
      <div className="embla__viewport w-full" ref={emblaRef}>
        <div className="embla__container w-full">
          {slides.map((i,index) => {
            return (
              <Item item={i} key={index} clickIndex={clickIndex} 
              setClickIndex = {setClickIndex}
            setClickDate = {setClickDate}
            chooseDate = {chooseDate}
            clickDate = {clickDate}
              />
            );
          })}
        </div>
      </div>
      <div className="embla__buttons">
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
    </section>
  );
};

export default EmblaCarousel;
