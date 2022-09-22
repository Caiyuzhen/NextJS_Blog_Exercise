import { useState,useEffect,AnimationEventuseEffect } from 'react'
// 在 app.js 中统一引入 css 样式
import '../styles/globals.css'
import '../styles/index.scss'
import '../styles/blog.scss'


function MyApp({ Component, pageProps }) {

  //解决 next.js 服务端渲染的问题，无法渲染 html 子内容
  const [showChild,setShowChild] = useState(false)

  useEffect(()=>{
	setShowChild(true)
  },[])

  if(!showChild){
	return null
  }

  return <Component {...pageProps} />
}

export default MyApp
