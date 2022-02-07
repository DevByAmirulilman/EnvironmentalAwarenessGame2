import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


export default class Task
{
    constructor(params,target,input)
    {   
        this.timmy = target
        this._scene= params.scene
        this.input = input
        
        this._tasks()
        this.allTasks = []
        
    }
    _tasks(){
        this.thrash()
        this.banana()
        this.apple()
        this.bottle()
        this.cup()
        this.bone()
        
        
    }
    bone(){
        const loader = new FBXLoader();
        loader.setPath('./resources/model/trash/')
        loader.load('bone.fbx',(bone)=>{ 
            bone.scale.setScalar(0.01)
            bone.position.set(-90,3,-100)
            this.bonePosition = bone.position
            this._scene.add(bone)
            this.boneObj = bone
            bone.name = 'bone'
            this._allTasks(bone.name)
        })
    }
    cup() {
        const loader = new FBXLoader();
        loader.setPath('./resources/model/trash/')
        loader.load('cup.fbx',(cup)=>{ 
            cup.scale.setScalar(0.01)
            cup.position.set(-50,3,-100)
            this.cupPosition = cup.position
            this._scene.add(cup)
            this.cupObj = cup
            cup.name = 'cup'
            this._allTasks(cup.name)
        })
    }
    bottle(){
        const loader = new FBXLoader();
        loader.setPath('./resources/model/trash/')
        loader.load('bottle.fbx',(bottle)=>{ 
            bottle.scale.setScalar(0.01)
            bottle.position.set(50,3,-100)
            this.bottlePosition = bottle.position
            this._scene.add(bottle)
            this.bottleObj = bottle
            bottle.name = 'bottle'
            this._allTasks(bottle.name)
        })
    }
    apple(){
        const loader = new FBXLoader();
        loader.setPath('./resources/model/trash/')
        loader.load('apple1.fbx',(apple)=>{ 
            apple.scale.setScalar(0.01)
            apple.position.set(50,3,-50)
            this.apple1Position = apple.position
            this._scene.add(apple)
            this.apple1Obj = apple
            apple.name = 'apple'
            this._allTasks(apple.name)
        })
    }
    thrash() {
        const loader = new FBXLoader();
        loader.setPath('./resources/model/trash/')
        loader.load('trash.fbx',(trash)=>{ 
        trash.scale.setScalar(0.1)
        trash.position.set(100,0,2)
        this.trashPosition = trash.position
        this._scene.add(trash)
        this.trash = trash
        trash.name = 'trash'
        this._allTasks(trash.name)
        })
    }
    banana(){
        const loader = new FBXLoader();
        loader.setPath('./resources/model/trash/')
        loader.load('banana.fbx',(banana)=>{ 
            banana.scale.setScalar(0.01)
            banana.position.set(10,3,2)
            this.bananaPosition = banana.position
            this._scene.add(banana)
            this.bananaObj = banana
            banana.name = 'banana'
            this._allTasks(banana.name)
           
        })
    }
    getNearBy(position,object) {
        this.distance = this.timmy.position.distanceTo(position)
        this.object = object
        if(this.distance<30){
            if(this.input.space == true){
                this.removeObject(this.object)
            }
        }
    }
    removeObject(object) {
        this._scene.remove(object)
        this._finishedTask(object.name)
    }
    _allTasks(name) {
        document.getElementById(name).innerHTML = name
        this.allTasks.push(name)
    }
    _finishedTask(name) {
        document.getElementById(name).innerHTML = '<strike>' + name
        let index = this.allTasks.indexOf(name)
        if(index !== -1) {
            this.allTasks.splice(index, 1)
        }
        console.log(this.allTasks.length)
        this._doneAllTasks()
    }
    _doneAllTasks() {
        if(this.allTasks.length===0){
            document.getElementById("done").innerHTML = "Congratulations You have Done All Tasks"
        }
    }
    update() {
        this.getNearBy(this.trashPosition,this.trash)
        this.getNearBy(this.bananaPosition,this.bananaObj)
        this.getNearBy(this.apple1Position,this.apple1Obj)
        this.getNearBy(this.bottlePosition,this.bottleObj)
        this.getNearBy(this.cupPosition,this.cupObj)
        this.getNearBy(this.bonePosition,this.boneObj)
    }
}