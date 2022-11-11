import debounce from 'lodash/debounce';

export function useMouseOverDelay(delay = 500) {
    const handleOnMouseEnter = debounce((handler) => handler(), delay);
    const handleOnMouseLeave = debounce((handler) => handler(), delay);

    return [
        function (handler = () => null) {
            handleOnMouseLeave.cancel();
            handleOnMouseEnter(handler);
        },
        function (handler = () => null) {
            handleOnMouseEnter.cancel();
            handleOnMouseLeave(handler);
        },
    ];
}
