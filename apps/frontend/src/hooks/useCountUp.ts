import { useEffect, useState } from "react"

export const useCountUp = (endValue: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(startValue + (endValue - startValue) * progress);
      setCount(value);

      if(progress < 1) {
        requestAnimationFrame(animate)
      }
    };

    animate();
  }, [endValue, duration]);

  return count;
}