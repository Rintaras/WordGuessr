"use client"
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function EarthBackground() {
    const mountRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const earthRef = useRef<THREE.Mesh | null>(null)
    const cloudsRef = useRef<THREE.Mesh | null>(null)
    const animationIdRef = useRef<number | null>(null)

    useEffect(() => {
        if (!mountRef.current) return

        console.log('EarthBackground: Initializing Three.js scene')

        // シーンの設定
        const scene = new THREE.Scene()
        sceneRef.current = scene

        // カメラの設定
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 5
        camera.position.y = 0

        // レンダラーの設定（パフォーマンス最適化）
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false, // アンチエイリアスを無効化
            powerPreference: "high-performance"
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // ピクセル比を制限
        rendererRef.current = renderer

        // テクスチャローダー
        const textureLoader = new THREE.TextureLoader()

        // 地球のジオメトリとマテリアル（軽量化）
        const earthGeometry = new THREE.SphereGeometry(1.5, 32, 32) // 128→32に削減

        // 実際の地球テクスチャをロード
        const earthTexture = textureLoader.load('/textures/earth_daymap.jpg')
        earthTexture.minFilter = THREE.LinearFilter // フィルタリングを最適化
        earthTexture.magFilter = THREE.LinearFilter

        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthTexture,
            specular: new THREE.Color(0x333333),
            shininess: 50, // 100→50に削減
            transparent: true,
            opacity: 0.95
        })

        // 地球メッシュの作成
        const earth = new THREE.Mesh(earthGeometry, earthMaterial)
        earth.position.x = 3
        earth.position.y = 0
        earthRef.current = earth
        scene.add(earth)

        console.log('EarthBackground: Earth added to scene at position:', earth.position)

        // 雲のレイヤー（軽量化）
        const cloudsGeometry = new THREE.SphereGeometry(1.51, 32, 32) // 128→32に削減
        const cloudsTexture = textureLoader.load('/textures/earth_clouds.png')
        cloudsTexture.minFilter = THREE.LinearFilter
        cloudsTexture.magFilter = THREE.LinearFilter

        const cloudsMaterial = new THREE.MeshPhongMaterial({
            map: cloudsTexture,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        })
        const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial)
        clouds.position.x = 3
        clouds.position.y = 0
        cloudsRef.current = clouds
        scene.add(clouds)

        // 大気圏のエフェクト（軽量化）
        const atmosphereGeometry = new THREE.SphereGeometry(1.7, 32, 32) // 128→32に削減
        const atmosphereMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0x87ceeb),
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        })
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
        atmosphere.position.x = 3
        atmosphere.position.y = 0
        scene.add(atmosphere)

        // 追加の大気圏レイヤー（外側、軽量化）
        const outerAtmosphereGeometry = new THREE.SphereGeometry(1.8, 32, 32) // 128→32に削減
        const outerAtmosphereMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0x4a90e2),
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        })
        const outerAtmosphere = new THREE.Mesh(outerAtmosphereGeometry, outerAtmosphereMaterial)
        outerAtmosphere.position.x = 3
        outerAtmosphere.position.y = 0
        scene.add(outerAtmosphere)

        // 星空の背景（大幅に軽量化）
        const starsGeometry = new THREE.BufferGeometry()
        const starsCount = 300 // 1500→300に削減
        const starsPositions = new Float32Array(starsCount * 3)
        const starsSizes = new Float32Array(starsCount)

        for (let i = 0; i < starsCount * 3; i += 3) {
            starsPositions[i] = (Math.random() - 0.5) * 2000 // 3000→2000に削減
            starsPositions[i + 1] = (Math.random() - 0.5) * 2000
            starsPositions[i + 2] = (Math.random() - 0.5) * 2000
            starsSizes[i / 3] = Math.random() * 2 + 1 // 3→2に削減
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3))
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1))

        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.5, // 2→1.5に削減
            transparent: true,
            opacity: 0.8, // 0.9→0.8に削減
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        })
        const stars = new THREE.Points(starsGeometry, starsMaterial)
        scene.add(stars)

        // ライティング（軽量化）
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5) // 0.4→0.5に増加
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2) // 1.5→1.2に削減
        directionalLight.position.set(8, 4, 8)
        directionalLight.castShadow = false
        scene.add(directionalLight)

        const pointLight = new THREE.PointLight(0x4a90e2, 0.8, 100) // 1.0→0.8、150→100に削減
        pointLight.position.set(-8, -4, -8)
        scene.add(pointLight)

        // 追加のポイントライト（地球を際立たせる、軽量化）
        const earthLight = new THREE.PointLight(0x87ceeb, 0.2, 30) // 0.3→0.2、50→30に削減
        earthLight.position.set(3, 0, 2)
        scene.add(earthLight)

        // マウントにレンダラーを追加
        mountRef.current.appendChild(renderer.domElement)
        console.log('EarthBackground: Renderer added to DOM')

        // アニメーション関数（軽量化）
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate)

            if (earthRef.current) {
                earthRef.current.rotation.y += 0.002 // 0.003→0.002に削減
                earthRef.current.rotation.x += 0.0005 // 0.001→0.0005に削減
            }

            if (cloudsRef.current) {
                cloudsRef.current.rotation.y += 0.004 // 0.006→0.004に削減
                cloudsRef.current.rotation.x += 0.001 // 0.002→0.001に削減
            }

            if (stars) {
                stars.rotation.y += 0.0002 // 0.0003→0.0002に削減
            }

            renderer.render(scene, camera)
        }

        animate()
        console.log('EarthBackground: Animation started')

        // リサイズハンドラー
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // クリーンアップ
        return () => {
            console.log('EarthBackground: Cleaning up')
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }
            window.removeEventListener('resize', handleResize)
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ zIndex: 0 }}
        />
    )
}
