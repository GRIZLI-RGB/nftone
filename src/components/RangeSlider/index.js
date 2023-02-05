import { useEffect } from "react";
import "./RangeSlider.scss";
import $ from "jquery";

function RangeSlider() {
    useEffect(() => {
        var $slider = $("#slider-popa");
        var $fill = $(".bar .fill");

        function setBar() {
            $fill.css("width", $slider.val() + "%");
        }

        $slider.on("input", setBar);

        setBar();
    }, []);
    //         var inputLeft = document.getElementById("input-left");
    //         var inputRight = document.getElementById("input-right");
    //         var thumbLeft = document.getElementById("thumb-left");
    //         var thumbRight = document.getElementById("thumb-right");
    //         var range = document.getElementById("range");

    //         function setLeftValue() {
    //             var _this = inputLeft,
    //                 min = parseInt(_this.min),
    //                 max = parseInt(_this.max);

    //             _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

    //             var percent = ((_this.value - min) / (max - min)) * 100;

    //             thumbLeft.style.left = percent + "%";
    //             range.style.left = percent + "%";
    //         }
    //         setLeftValue();

    //         function setRightValue() {
    //             var _this = inputRight,
    //                 min = parseInt(_this.min),
    //                 max = parseInt(_this.max);

    //             _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

    //             var percent = ((_this.value - min) / (max - min)) * 100;

    //             thumbRight.style.right = 100 - percent + "%";
    //             range.style.right = 100 - percent + "%";
    //         }
    //         setRightValue();

    //         inputLeft.addEventListener("input", setLeftValue);
    // inputRight.addEventListener("input", setRightValue);
    //     }, []);
    return (
        <div class="slider-input-container">
            <span class="bar">
                <span class="fill"></span>
            </span>
            <input id="slider-popa" class="slider-input" type="range" min="100" max="400" step="100"/>
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
