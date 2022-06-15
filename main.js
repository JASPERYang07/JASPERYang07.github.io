import * as THREE from './build/three.module.js'
//引入帧率检测工具
import Stat from 'three/examples/jsm/libs/stats.module'
//引入鼠标控制操作
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const w = window.innerWidth
const h = window.innerHeight
// 创建帧率检测窗口
const stat = new Stat()

//house container
//场景：scene
const scence = new THREE.Scene()

//staff furniture
//物体：geometry(几何体)material(材质)  
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial()
const cube = new THREE.Mesh(geometry,material)
scence.add(cube)

//index transform
//坐标轴的变换，在三维空间中每个物体存在于三维坐标中，threejs中包含了3个变化的属性，分别为position，rotation，scale

// //建立坐标系 XYZ == RGB
// const axes = new THREE.AxesHelper(2,2,2)
// scence.add(axes)

// //position 位置改变
// // cube.position.x = 1
// // cube.position.y = 1
// // cube.position.z = 1
// cube.position.set(0,0,0)
// console.log(cube.position)

// //rotation 角度改变 
// //cube.rotation.x = 45 /180 * Math.PI
// cube.rotation.y = 45 /180 * Math.PI
// //cube.rotation.z = 45 /180 * Math.PI
// console.log(cube.rotation)

// //scale 大小改变
// // cube.scale.x = 2
// // cube.scale.y = 2
// // cube.scale.z = 2
// cube.scale.set(2,1,2)
// console.log(cube.scale)


// light-台灯 吊灯 太阳光
const light = new THREE.AmbientLight()
scence.add(light)

//camera 相机
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,100)
camera.position.set(0,0,5)
camera.lookAt(0,0,0)

//renderer 渲染
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(w,h)


document.body.append(renderer.domElement)
document.body.append(stat.dom)

//setInterval js动画方法1

// setInterval(()=>{
//   cube.rotation.z += 0.01
//   renderer.render(scence,camera)
// }, 1000/60)

//request AnimationFram
// function tick(){
//   cube.rotation.z += 0.01
//   renderer.render(scence,camera)
//   requestAnimationFrame(tick)
// }
// tick()

// 刷新率的问题。在不同刷新率的电脑上，动画的旋转角度不同。
// 在60hz的电脑上 60*0.01 = 0.6（旋转角度）
// 在120hz的电脑上 120*0.01 = 1.2（旋转角度）
// 解决刷新率问题  利用three自带的clock方法，均衡每一次旋转的时间，从而在不同的浏览器上显示相同的速率

// 创建鼠标控制
const orbitControl = new OrbitControls(camera, renderer.domElement)

const clock = new THREE.Clock()
tick()
function tick(){
  const time = clock.getElapsedTime()
  cube.rotation.z = time
  //cube.position.x = Math.sin(time * 2)
  //cube.position.y = Math.cos(time * 2)
  renderer.render(scence,camera)
  requestAnimationFrame(tick)
  //帧率检测
  stat.update()
  //创建鼠标控制
  orbitControl.update()
}


