import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

/**
 * Textures
 */
//grass texture
const textureLoader = new THREE.TextureLoader()
const grassColorTexture = textureLoader.load('./resources/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('./resources/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('./resources/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('./resources/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT= THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping


export default class Environment{
    constructor(scene){
        this._scene = scene;
        this.plane()
        this.house()
        this.secondHouse()
   
       
    
    }
     // Floor
    plane(){
    const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ 
        map:grassColorTexture,
        aoMap:grassAmbientOcclusionTexture,
        normalMap:grassNormalTexture,
        roughness:grassRoughnessTexture
     }))

    floor.rotation.x = - Math.PI * 0.5
    floor.scale.setScalar(3)
    floor.traverse(c => {
        c.castShadow = true;
      });
    floor.position.y = 0
    this._scene.add(floor)
    }
    /**
     * House
     */
    house(){
        const loader = new FBXLoader()
        loader.setPath("./resources/model/house/")
        loader.load('house.fbx',(house)=>{
        house.scale.setScalar(0.1)
        house.traverse(c => {
            c.castShadow = true;
          });
        house.position.set(-50,0,100)
        this._scene.add(house) 
        })
    }
    secondHouse(){
        const loader = new FBXLoader();
        loader.setPath('./resources/model/house/')
        loader.load('secondHouse.fbx',(house)=>{ 
            house.scale.setScalar(0.1)
            house.traverse(c => {
                c.castShadow = true;
              });
            house.position.set(100,0,100)
            this._scene.add(house) 
        })
    }
}