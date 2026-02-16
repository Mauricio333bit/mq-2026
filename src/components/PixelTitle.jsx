import React, { useEffect, useRef, useState } from 'react';

const PixelTitle = ({ text }) => {
  const canvasRef = useRef(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 150;

    // 1. Crear molde invisible para obtener coordenadas
    ctx.font = `40px "Press Start 2P"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#64ffda';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = [];
    const step = 4; // Tamaño del bloque de píxel para que se vea nítido

    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 128) {
          particles.push({
            x: x + (Math.random() - 0.5) * 100, // Empiezan dispersos
            y: y + (Math.random() - 0.5) * 100,
            originX: x,
            originY: y,
            alpha: 0,
            vx: 0,
            vy: 0,
            friction: 0.9,
            spring: 0.05
          });
        }
      }
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let allDone = true;

      particles.forEach(p => {
        // Física de "resorte" para que lleguen suavemente a su lugar
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        
        p.vx += dx * p.spring;
        p.vy += dy * p.spring;
        p.vx *= p.friction;
        p.vy *= p.friction;
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha < 1) p.alpha += 0.01;

        ctx.fillStyle = `rgba(100, 255, 218, ${p.alpha})`;
        // Dibujamos el píxel redondeado para evitar el efecto borroso
        ctx.fillRect(Math.round(p.x), Math.round(p.y), 3, 3);

        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) allDone = false;
      });

      if (!allDone) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Pequeño delay para que el ojo procese la imagen formada
        setTimeout(() => setIsFinished(true), 400);
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [text]);

  return (
    <div className="pixel-header">
      {/* El canvas se oculta suavemente al terminar */}
      <canvas 
        ref={canvasRef} 
        className={isFinished ? 'canvas-fade-out' : ''} 
        style={{ imageRendering: 'pixelated' }}
      />
      {/* El texto real aparece con efecto blur-to-sharp */}
      {isFinished && <h1 className="final-pixel-text">{text}</h1>}
    </div>
  );
};

export default PixelTitle;