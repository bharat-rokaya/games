const g = game,
        p = player,
        e = document.getElementById("e"),
        c = document.getElementById("c");
      let x = 50,
        y = 50,
        ex = 600,
        ey = 350,
        score = 0,
        lives = 3,
        time = 60,
        speed = 3,
        run = true;
      let hs = +localStorage.high || 0;
      h.textContent = "High:" + hs;
      const obs = [];
      for (let i = 0; i < 5; i++) {
        let d = document.createElement("div");
        d.className = "ob";
        let w = 80,
          hh = 20;
        if (i % 2) {
          w = 20;
          hh = 80;
        }
        d.style.width = w + "px";
        d.style.height = hh + "px";
        d.x = Math.random() * (700 - w);
        d.y = Math.random() * (450 - hh);
        d.style.left = d.x + "px";
        d.style.top = d.y + "px";
        g.appendChild(d);
        obs.push(d);
      }
      function rc() {
        c.x = Math.random() * 680;
        c.y = Math.random() * 430;
        c.style.left = c.x + "px";
        c.style.top = c.y + "px";
      }
      rc();
      const k = {};
      onkeydown = (e) => (k[e.key.toLowerCase()] = 1);
      onkeyup = (e) => (k[e.key.toLowerCase()] = 0);
      function hit(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
      }
      setInterval(() => {
        if (!run) return;
        time--;
        t.textContent = "Time:" + time;
        if (time <= 0) end();
      }, 1000);
      function end() {
        run = false;
        if (score > hs) {
          localStorage.high = score;
        }
        msg.textContent = "Game Over! Score " + score;
      }
      function loop() {
        if (run) {
          let ox = x,
            oy = y;
          if (k.arrowup || k.w) y -= speed;
          if (k.arrowdown || k.s) y += speed;
          if (k.arrowleft || k.a) x -= speed;
          if (k.arrowright || k.d) x += speed;
          x = Math.max(0, Math.min(668, x));
          y = Math.max(0, Math.min(418, y));
          for (let o of obs) {
            if (hit(x, y, 32, 32, o.x, o.y, o.offsetWidth, o.offsetHeight)) {
              x = ox;
              y = oy;
            }
          }
          let dx = x - ex,
            dy = y - ey,
            d = Math.hypot(dx, dy) || 1;
          ex += (dx / d) * 1.5;
          ey += (dy / d) * 1.5;
          if (hit(x, y, 32, 32, c.x, c.y, 20, 20)) {
            score++;
            s.textContent = "Score:" + score;
            rc();
          }
          if (hit(x, y, 32, 32, ex, ey, 30, 30)) {
            lives--;
            l.textContent = "Lives:" + lives;
            x = 50;
            y = 50;
            if (lives <= 0) end();
          }
          p.style.left = x + "px";
          p.style.top = y + "px";
          e.style.left = ex + "px";
          e.style.top = ey + "px";
        }
        requestAnimationFrame(loop);
      }
      loop();