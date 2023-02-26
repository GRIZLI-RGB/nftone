import { useEffect } from "react";
import "./RangeSlider.scss";
import $ from "jquery";

function RangeSlider({setValue}) {

    useEffect(() => {
        var $slider = $("#slider-popa");
        var $fill = $(".bar .fill");

        function setBar() {
            $fill.css("width", $slider.val() + "%");
        }

        $slider.on("input", setBar);

        setBar();
    }, []);

    return (
        <div class="slider-input-container">
            <span class="bar">
                <span class="fill"></span>
            </span>
            <input id="slider-popa" class="slider-input" type="range" min="100" max="400" step="100" onChange={(e) => setValue((Number(e.target.value) - 100) / 10)} />
            <div class="rangeSlider__count">
                <div className="rangeSlider__count-item">
                    0%
                </div>
                <div className="rangeSlider__count-item">
                    10%
                </div>
                <div className="rangeSlider__count-item">
                    20%
                </div>
                <div className="rangeSlider__count-item">
                    30%
                </div>
            </div>
        </div>
    );
}

export default RangeSlider;
