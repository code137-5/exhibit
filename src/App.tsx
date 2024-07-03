import './App.css'
import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe'

const data = {
	urls:[
		"https://storage.googleapis.com/tfjs-models/demos/face-detection/index.html?model=mediapipe_face_detector",
		"https://naver.com",
		"https://webcamtests.com/check",
		"https://www.instagram.com/reel/C6ytN7srSiq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA%3D%3D",
		"https://google.com",
		"https://github.com/robbestad/react-iframe"
	],
	artist:{
		name : [
			"한태재",
			"서동이",
			"최민성",
			"조종혁",
			"이재상",
			"이상헌",
		],
		site:[
			'https://taejaehan.com/',
			'https://taejaehan.com/',
			'https://taejaehan.com/',
			'https://taejaehan.com/',
			'https://taejaehan.com/',
			'https://taejaehan.com/',
		]
	},
	art:{
		title:[
			"Truth in Pendulum",
			"Gradient Text",
			"Truth in Pendulum",
			"Gradient Text",
			"Harmonograph generator",
			"Harmonograph generator",
		],
		desc:[
			"adfvadfasdfasdfasdf",
			"adfvadfasdfasdfasdf",
			"adfvadfasdfasdfasdf",
			"adfvadfasdfasdfasdf",
			"adfvadfasdfasdfasdf",
			"adfvadfasdfasdfasdf",
		],
	}
	
}



let i = 0;
function App() {
	console.log('app')

    const [nextUrl, setNextUrl] = useState<string>(data.urls[0]);
	
	useEffect(()=>{
		setTimeout(() => {
			i++;
			if(i > data.urls.length){
				i = 0;
			}
			setNextUrl(data.urls[i])
		}, 10000);
	},[nextUrl])

	return (
		<>
			<Iframe url={nextUrl}
					allow="camera"
					width="100%"
					height="100%"
					id=""
					className=""
					display="block"
					position="relative"/>
			<div
				style={{
					position:'fixed',
					bottom:0,
					right:0,
				}}
			>
				{/* {data.artist.map(
                        (artist: any, index: number) => {
							
                            const title = data.art.title[index];
                            return(
								<>
									<h2>{title}</h2>
									<h2>{artist}</h2>
								</>
                            )
                        },
                    )
                } */}

				<h2>{data.artist.name[i]}</h2>
				<h2>{data.artist.site[i]}</h2>
				<h2>{data.art.title[i]}</h2>
			
			</div>
		</>
	)
}

export default App
