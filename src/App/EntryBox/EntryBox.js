// in src/App/EntryBox/EntryBox.js...
import "./EntryBox.css";
import { useState } from "react";
import ColorEntryBox from "./ColorEntryBox/ColorEntryBox.js";

function EntryBox({ updateRGB }) {
    const [rgb, setRgb] = useState([0, 0, 0]);
    const [hsv, setHsv] = useState([0, 0, 0]);

    function rgb2hsv(r, g, b) {
        let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        v = Math.max(rabs, gabs, babs);
        diff = v - Math.min(rabs, gabs, babs);
        diffc = (c) => (v - c) / 6 / diff + 1 / 2;
        percentRoundFn = (num) => Math.round(num * 100) / 100;
        if (diff === 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);
    
            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = 1 / 3 + rr - bb;
            } else if (babs === v) {
                h = 2 / 3 + gg - rr;
            }
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }
        return [
            Math.round(h * 360),
            percentRoundFn(s * 100),
            percentRoundFn(v * 100),
        ];
    }

    function onButtonClick() {
        // Convert the values to HSV
        let r = rgb[0],
            g = rgb[1],
            b = rgb[2];
    
        // Set the values in the HSV input fields
        let hsv = rgb2hsv(r, g, b);
        setHsv(hsv);
    
        // Push the RGB value back up to the App
        updateRGB([r, g, b]);
    }

    return (
        <div className="EntryBox">
            <ColorEntryBox
                labels={["R", "G", "B"]}
                readOnly={false}
                values={rgb}
                updateVals={setRgb}
            />
            <button onClick={onButtonClick}>Convert</button>
            <ColorEntryBox
                labels={["H", "S", "V"]}
                readOnly={true}
                values={hsv}
                updateVals={setHsv}
            />
        </div>
    );
}

export default EntryBox;