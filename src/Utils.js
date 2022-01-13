import{useEffect} from 'react';

//listens for click and closes modal if user clicks outside of modal
export function useOnClickOutside(ref, handler) {
useEffect(
  () => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },
  // Add ref and handler to effect dependencies
  // It's worth noting that because the passed-in handler is a new ...
  // ... function on every render that will cause this effect ...
  // ... callback/cleanup to run every render. It's not a big deal ...
  // ... but to optimize you can wrap handler in useCallback before ...
  // ... passing it into this hook.
  [ref, handler]
);
}

//Checks if string is a URL
export function isValidHttpUrl(string) {
let url;
try {
  url = new URL(string);
} catch (_) {
  return false;
}
return url.protocol === "http:" || url.protocol === "https:";
}

//converts budget and revenue into readable string
export function readableNum(x) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
