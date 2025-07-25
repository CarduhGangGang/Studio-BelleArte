import  { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';

type MultiRangeSliderProps = {
    min: number;
    max: number;
    onChange : any;
    // values: [number, number];
};


const MultiRangeSlider : React.FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value : any) => Math.round(((value - min) / (max - min)) * 100),
        [min, max],
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        let minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);
        if (range.current) {
            (range.current as HTMLDivElement).style.left = `${minPercent}%`;
            (range.current as HTMLDivElement).style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);
        if (range.current) {
            (range.current as HTMLDivElement).style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <>
            <div className="price-slider">
                <span id="input-with-keypress-0">${minVal}-</span>
                <span id="input-with-keypress-1">${maxVal}</span>
                
                <div className="range-container">
                    <input
                        type="range"
                        min={'0'}
                        max={'1000'}
                        value={minVal}
                        onChange={(event) => {
                            const value = Math.min(Number(event.target.value), maxVal - 1);
                            setMinVal(value);
                            minValRef.current = value;
                        }}
                        className="thumb thumb--left"
                        style={{ zIndex: minVal > max - 1000 ? 5 : undefined }}
                    />
                    <input

                        type="range"
                        min={'0'}
                        max={'1000'}
                        value={maxVal}
                        onChange={(event) => {
                            const value = Math.max(Number(event.target.value), minVal + 0.1);
                            setMaxVal(value);
                            maxValRef.current = value;
                        }}
                        className="thumb thumb--right"
                    />

                    <div className="slider">
                        <div className="slider__track" />
                        <div ref={range} className="slider__range" />
                    </div>
                </div>
            </div>
        </>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;