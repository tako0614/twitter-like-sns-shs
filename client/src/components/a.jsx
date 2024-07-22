import React, { useState, useEffect, useRef } from 'react';

function InfinityScroll({ fetchData }) {
  const [items, setItems] = useState([]);
  const loadingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting) {
        const newItems = await fetchData();
        setItems(prevItems => [...prevItems, ...newItems]);
      }
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [fetchData]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <div ref={loadingRef}>Loading...</div>
    </div>
  );
}
export default InfinityScroll;