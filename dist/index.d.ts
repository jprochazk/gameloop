export declare namespace Loop {
    /**
     * This is used to set the frequency of updates.
     * Updates are done in consistent intervals, as far as the js event loop will allow it.
     */
    function setUpdateFrequency(value: number): void;
    /**
     * Used to set the maximum number of updates that can happen during a single frame
     * After this limit is reached, further updates are delayed until the next frame
     */
    function setMaxConsecutiveUpdates(value: number): void;
    /**
     * Starts the main loop.
     * @param update Place your game logic and/or simulations in here.
     * @param render Place anything that needs to run as fast as possible here.
     */
    function run(update: () => void, render: (interpolation: number) => void): void;
}
