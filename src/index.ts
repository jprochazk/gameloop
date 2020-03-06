export namespace Loop {
    let update_time_delta = 1000 / 25;
    /**
     * This is used to set the frequency of updates.  
     * Updates are done in consistent intervals, as far as the js event loop will allow it.
     */
    export function setUpdateFrequency(value: number) {
        update_time_delta = 1000 / value;
    }

    let max_consecutive_updates = 5;
    /**
     * Used to set the maximum number of updates that can happen during a single frame  
     * After this limit is reached, further updates are delayed until the next frame
     */
    export function setMaxConsecutiveUpdates(value: number) {
        max_consecutive_updates = value;
    }

    /**
     * Starts the main loop. 
     * @param update Place your game logic and/or simulations in here.
     * @param render Place anything that needs to run as fast as possible here.
     */
    export function run(
        update: ()=>void, 
        render: (interpolation: number)=>void
    ) {
        let next_game_tick = window.performance.now();
        let processed_update_count;
        let interpolation;

        const loop = (T: number) => {
            processed_update_count = 0;
            while(T > next_game_tick && processed_update_count < max_consecutive_updates) {
                update();

                next_game_tick += update_time_delta;
                processed_update_count++;
            }

            interpolation = (T + update_time_delta - next_game_tick) / update_time_delta;
            render(interpolation);

            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);
    }
}
