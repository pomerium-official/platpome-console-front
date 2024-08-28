import React, { useEffect, useRef } from 'react';

interface ToastProps {
  content?: React.ReactNode;
  /**
   * ms
   */
  life?: number;
}

const Toast = ({ content, life = 3000 }: ToastProps) => {
  const timer = useRef<NodeJS.Timer>();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      toastRef.current?.remove();
    }, life);
  }, []);

  return (
    <div
      ref={toastRef}
      className="toast"
      style={{ animationDuration: `${life}ms` }}
    >
      {content}
    </div>
  );
};

export default Toast;
