// import { useEffect, useRef } from "react";
import { useEffect, useRef, useState } from "react";

export default function PointerNetworkCanvas() {
  const canvasRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
  const isMobile = window.innerWidth < 768;

  if (!isMobile) {
    setStartAnimation(true);
    return;
  }

  const timer = setTimeout(() => {
    setStartAnimation(true);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    if (!startAnimation) return;
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationId;

    const mouse = {
  x: null,
  y: null,
  radius: 220,
};

    const particles = [];

    // const PARTICLE_COUNT = 65;
    const isMobile = window.innerWidth < 768;

const PARTICLE_COUNT = isMobile ? 35 : 65;

    function resizeCanvas() {
      const parent = canvas.parentElement;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

        // this.radius = Math.random() * 2 + 1.5;
        this.radius = Math.random() * 1.2 + 1;

//         this.offsetX = 0;
// this.offsetY = 0;
// this.velX = 0;
// this.velY = 0;
// this.targetOffsetX = 0;
// this.targetOffsetY = 0;
this.offsetX = 0;
this.offsetY = 0;
this.velX = 0;
this.velY = 0;
this.targetOffsetX = 0;
this.targetOffsetY = 0;
// connectionTarget and connectionStrength are missing here
this.connectionTarget = 0;
this.connectionStrength = 0;
      }


update() {
  // const spring = 0.1;
  // const damping = 0.6;
  const spring = 0.01;
const damping = 0.88;

  this.velX += (this.targetOffsetX - this.offsetX) * spring;
  this.velY += (this.targetOffsetY - this.offsetY) * spring;

  this.velX *= damping;
  this.velY *= damping;

  this.offsetX += this.velX;
  this.offsetY += this.velY;

  // slow, smooth fade for the connection lines
  this.connectionStrength += (this.connectionTarget - this.connectionStrength) * 0.06;
  if (this.connectionStrength < 0.001) this.connectionStrength = 0;

  this.x += this.vx;
  this.y += this.vy;

  if (this.x <= 0 || this.x >= canvas.width) {
    this.vx *= -1;
  }

  if (this.y <= 0 || this.y >= canvas.height) {
    this.vy *= -1;
  }
}

      draw() {
        ctx.beginPath();

        ctx.arc(
          // this.x,
          // this.y,
          this.x + this.offsetX,
this.y + this.offsetY,
          this.radius,
          0,
          Math.PI * 2
        );

        // ctx.fillStyle = "rgba(255,255,255,0.9)";
        // ctx.shadowBlur = 8;
        // ctx.shadowColor = "#7fb6ff";
        ctx.fillStyle = "rgba(255,255,255,0.65)";
ctx.shadowBlur = 2;
ctx.shadowColor = "rgba(127,182,255,0.25)";

        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
    
    const container = canvas.parentElement;

const mouseMove = (e) => {
  const rect = canvas.getBoundingClientRect();

  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
};

const mouseLeave = () => {
  mouse.x = null;
  mouse.y = null;
};

container.addEventListener("mousemove", mouseMove);
container.addEventListener("mouseleave", mouseLeave);

 

    function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const ax = particles[a].x + particles[a].offsetX;
      const ay = particles[a].y + particles[a].offsetY;
      const bx = particles[b].x + particles[b].offsetX;
      const by = particles[b].y + particles[b].offsetY;

      const dx = ax - bx;
      const dy = ay - by;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const opacity = (150 - distance) / 150 * 0.25;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);

        ctx.strokeStyle = `rgba(120,180,255,${opacity})`;
        ctx.lineWidth = 1;

        ctx.stroke();
      }
    }
  }
}

function getNearestParticles(count) {
  if (mouse.x === null || mouse.y === null) return [];

  return particles
    .map((particle) => {
      const px = particle.x + particle.offsetX;
      const py = particle.y + particle.offsetY;
      const dx = px - mouse.x;
      const dy = py - mouse.y;
      return { particle, distance: Math.sqrt(dx * dx + dy * dy) };
    })
    .filter((p) => p.distance < mouse.radius)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}

function computeMouseTargets() {
  particles.forEach((particle) => {
    particle.targetOffsetX = 0;
    particle.targetOffsetY = 0;
    particle.connectionTarget = 0;
  });

  if (mouse.x === null || mouse.y === null) return;

  const maxPull = 90;
  const nearest = getNearestParticles(5);

  nearest.forEach(({ particle, distance }) => {
    const px = particle.x + particle.offsetX;
    const py = particle.y + particle.offsetY;

    const dx = px - mouse.x;
    const dy = py - mouse.y;
    const force = (mouse.radius - distance) / mouse.radius;
    const angle = Math.atan2(dy, dx);

    particle.targetOffsetX -= Math.cos(angle) * force * maxPull;
    particle.targetOffsetY -= Math.sin(angle) * force * maxPull;
    particle.connectionTarget = force;

    particles.forEach((neighbor) => {
      if (neighbor === particle) return;

      const ndx = (neighbor.x + neighbor.offsetX) - px;
      const ndy = (neighbor.y + neighbor.offsetY) - py;
      const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

      if (ndist < 150) {
        const propagate = force * 0.5 * ((150 - ndist) / 150);
        neighbor.targetOffsetX -= Math.cos(angle) * propagate * maxPull;
        neighbor.targetOffsetY -= Math.sin(angle) * propagate * maxPull;
      }
    });
  });
}


function drawMouseConnections() {
  if (mouse.x === null || mouse.y === null) return;

  particles.forEach((particle) => {
    if (particle.connectionStrength <= 0.01) return;

    const px = particle.x + particle.offsetX;
    const py = particle.y + particle.offsetY;

    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    ctx.lineTo(px, py);

    ctx.strokeStyle = `rgba(255,255,255,${particle.connectionStrength * 0.8})`;
    ctx.lineWidth = 1.2;

    ctx.stroke();
  });
}
       function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  computeMouseTargets();

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  connectParticles();
  drawMouseConnections();

  animationId = requestAnimationFrame(animate);
}
    animate();

    // return () => {
    //   cancelAnimationFrame(animationId);

    //   window.removeEventListener("resize", resizeCanvas);

    //   canvas.removeEventListener("mousemove", mouseMove);
    //   canvas.removeEventListener("mouseleave", mouseLeave);
    // };
    return () => {
  cancelAnimationFrame(animationId);

  window.removeEventListener("resize", resizeCanvas);

  container.removeEventListener("mousemove", mouseMove);
  container.removeEventListener("mouseleave", mouseLeave);
};
  // }, []);
  }, [startAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-auto"
      style={{
        zIndex: 0,
      }}
    />
  );
}