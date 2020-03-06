"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Loop;
(function (Loop) {
    var update_time_delta = 1000 / 25;
    /**
     * This is used to set the frequency of updates.
     * Updates are done in consistent intervals, as far as the js event loop will allow it.
     * @param {Number} value
     */
    function setUpdateFrequency(value) {
        update_time_delta = 1000 / value;
    }
    Loop.setUpdateFrequency = setUpdateFrequency;
    var max_consecutive_updates = 5;
    /**
     * Used to set the maximum number of updates that can happen during a single frame
     * After this limit is reached, further updates are delayed until the next frame
     * @param {Number} value
     */
    function setMaxConsecutiveUpdates(value) {
        max_consecutive_updates = value;
    }
    Loop.setMaxConsecutiveUpdates = setMaxConsecutiveUpdates;
    /**
     * Starts the main loop.
     * @param {()=>void} update Place your game logic and/or simulations in here.
     * @param {(interpolation: number)=>void} render Place anything that needs to run as fast as the browser can manage it here.
     */
    function run(update, render) {
        var next_game_tick = window.performance.now();
        var processed_update_count;
        var interpolation;
        var loop = function (T) {
            processed_update_count = 0;
            while (T > next_game_tick && processed_update_count < max_consecutive_updates) {
                update();
                next_game_tick += update_time_delta;
                processed_update_count++;
            }
            interpolation = (T + update_time_delta - next_game_tick) / update_time_delta;
            render(interpolation);
            window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
    }
    Loop.run = run;
})(Loop = exports.Loop || (exports.Loop = {}));
//# sourceMappingURL=../src/dist/index.js.map