import { useEffect } from "react";
import "./RangeSlider.scss";

function RangeSlider() {
    useEffect(() => {
        var inputLeft = document.getElementById("input-left");
        var inputRight = document.getElementById("input-right");
        var thumbLeft = document.getElementById("thumb-left");
        var thumbRight = document.getElementById("thumb-right");
        var range = document.getElementById("range");

        function setLeftValue() {
            var _this = inputLeft,
                min = parseInt(_this.min),
                max = parseInt(_this.max);

            _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

            var percent = ((_this.value - min) / (max - min)) * 100;

            thumbLeft.style.left = percent + "%";
            range.style.left = percent + "%";
        }
        setLeftValue();

        function setRightValue() {
            var _this = inputRight,
                min = parseInt(_this.min),
                max = parseInt(_this.max);

            _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

            var percent = ((_this.value - min) / (max - min)) * 100;

            thumbRight.style.right = 100 - percent + "%";
            range.style.right = 100 - percent + "%";
        }
        setRightValue();

        inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);
    }, []);
    return (
        <div className="rangeSlider">
            <div class="rangeSlider__container">
                <input id="input-left" class="rangeSlider__container-left" type="range" min="1" max="4" value="1" />
                <input id="input-right" class="rangeSlider__container-right" type="range" min="1" max="4" value="4"/>
                <div class="rangeSlider__container-slider">
                    <div className="rangeSlider__container-slider-track"></div>
                    <div className="rangeSlider__container-slider-range" id="range"></div>
                    <div className="rangeSlider__container-slider-thumbLeft" id="thumb-left"></div>
                    <div className="rangeSlider__container-slider-thumbRight" id="thumb-right"></div>
                </div>
                <div className="rangeSlider__container-percentage rangeSlider__container-percentage-0">
                    <div></div>
                    <p>0%</p>
                </div>
                <div className="rangeSlider__container-percentage rangeSlider__container-percentage-10">
                <div></div>
                    <p>10%</p>
                </div>
                <div className="rangeSlider__container-percentage rangeSlider__container-percentage-20">
                <div></div>
                    <p>20%</p>
                </div>
                <div className="rangeSlider__container-percentage rangeSlider__container-percentage-30">
                <div></div>
                    <p>30%</p>
                </div>
            </div>
        </div>
    );
}

export default RangeSlider;
