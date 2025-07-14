// Función que se ejecuta solo en el cliente
async function initParticles() {
    const THREE = await import('three');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Usar el canvas existente
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Crear partículas
    const particleCount = 100;
    const particles = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.02, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff,
            transparent: true,
            opacity: 0.6
        });
        const particle = new THREE.Mesh(geometry, material);
        
        // Posición inicial aleatoria
        particle.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        
        particles.add(particle);
    }

    scene.add(particles);

    // Variables para el mouse
    const mouse = new THREE.Vector2();
    const targetPosition = new THREE.Vector3();

    // Evento del mouse
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Convertir coordenadas del mouse a posición 3D
        targetPosition.set(mouse.x * 3, mouse.y * 2, 0);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        
        // Hacer que las partículas sigan al mouse
        particles.children.forEach((particle, index) => {
            const speed = 0.02 + (index * 0.001);
            particle.position.lerp(targetPosition, speed);
            
            // Agregar un poco de movimiento aleatorio
            particle.position.x += (Math.random() - 0.5) * 0.01;
            particle.position.y += (Math.random() - 0.5) * 0.01;
        });
        
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Verificar si estamos en el cliente antes de ejecutar
if (typeof window !== 'undefined') {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
}