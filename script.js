document.addEventListener("DOMContentLoaded", () => {

    const leafCanvas = document.getElementById("leafCanvas");
    const context = leafCanvas.getContext("2d");

    let leafs = [];
    const img = new Image();
    img.src = "img/leaf.png";

    function resizeCanvas() { //auto resize
        leafCanvas.width = window.innerWidth;
        leafCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);

    function getScaleForDevice() {//stolen fomr last project xdddddddd unused lol
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const baseWidth = 650;
        const baseHeight = 950;
        const scaleX = viewportWidth / baseWidth;
        const scaleY = viewportHeight / baseHeight;

        return Math.min(scaleX, scaleY, 1);
    }

    function generateFall(amnt) {
        for (let i = 0; i < amnt; i++) {
            leafs.push({

                x: Math.random() * leafCanvas.width,
                y: Math.random() * leafCanvas.height - leafCanvas.height,
                size: Math.random() * 40 + 45,
                speed: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.5,
                amplitude: Math.random() * 50 + 20,
                phase: Math.random() * Math.PI * 2,
            })
        }
    }

    function generateFallTrans(amnt) {//gae
        for (let i = 0; i < amnt; i++) {
            leafs.push({

                x: Math.random() * leafCanvas.width,
                y: leafCanvas.height,
                size: Math.random() * 40 + 45,
                speed: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.5,
                amplitude: Math.random() * 50 + 20,
                phase: Math.random() * Math.PI * 2,
            })
        }
    }

    function fallanimate() {
        context.clearRect(0, 0, leafCanvas.width, leafCanvas.height);

        leafs.forEach((leaf, i) => {

            context.globalAlpha = leaf.alpha;

            const x = leaf.x + Math.sin(leaf.phase) * leaf.amplitude;
            context.drawImage(img, x, leaf.y, leaf.size, leaf.size);

            leaf.y += leaf.speed;
            leaf.phase += 0.02;

            if (leaf.y > leafCanvas.height) {
                leaf.y = -leaf.size; // Reset to just above the canvas
                leaf.x = Math.random() * leafCanvas.width; // Random new x position
                leaf.size = Math.random() * 40 + 45; // Randomize size 
                leaf.speed = Math.random() * 2 + 1; // Randomize speed 
                leaf.alpha = Math.random() * 0.5 + 0.5; // Randomize transparency 
                leaf.amplitude = Math.random() * 50 + 20; // Randomize amplitude
                leaf.phase = Math.random() * Math.PI * 2; // Randomize phase
            }
        });
        context.globalAlpha = 1;
        requestAnimationFrame(fallanimate);
    }

    const faqBoxes = document.querySelectorAll(".faq-box");
    faqBoxes.forEach((box) => {
        const button = box.querySelector(".faq-question");
        button.addEventListener("click", () => {
            box.classList.toggle("active");
        });
    });

    resizeCanvas();
    generateFall(7);
    fallanimate();

})
