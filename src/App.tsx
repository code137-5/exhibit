import './App.css'
import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe'
import json from './data.json';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

let i = 0;
// json.data.sort(() => Math.random() - 0.5);


const fullscreen = (element:any) => {
	if (element.requestFullscreen) return element.requestFullscreen()
	if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
	if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
	if (element.msRequestFullscreen) return element.msRequestFullscreen()
  }
  
const container = document.getElementById('root')
document.addEventListener('click', e => {
	console.log("click")
	// fullscreen(container)
})

function makeRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

const timerRenderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
	if (completed) {
	  // Render a completed state
	  return <span>
			다음작품으로 넘어갑니다
			</span>;
	}
	
	const displayTime = minutes * 50 + seconds;
	// Render a countdown
	return (
	  <span>
		{displayTime}초 후 다음작품으로 넘어갑니다
	  </span>
	);
};
function App() {
	console.log('app')

    const [nextUrl, setNextUrl] = useState<string>(json.data[0].art.url);
    const [nextQrImage, setNextQrImage] = useState<string>(json.data[0].artist.qr);
    const [nextTimer, setNextTimer] = useState<number>(json.data[0].timer.milliseconds);
    const [color, setColor] = useState<string>('rgb(0,0,0)');
	
	useEffect(()=>{
		setTimeout(() => {
			i++;
			if(i > json.data.length){
				i = 0;
			}
			setNextUrl(json.data[i].art.url)
			setNextQrImage(json.data[i].artist.qr)
			setNextTimer(json.data[i].timer.milliseconds)
		}, nextTimer+2000);
	},[nextUrl])

	useEffect(()=>{
		setTimeout(() => {
			const col = makeRandomColor();
			setColor(col);
		}, 5000);
	},[color])

	console.log("nextTimer : ", nextTimer)
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
			<div className='art-desc' >

				<TableContainer component={Paper} className='desc-table-con'>
					<Table sx={{ minWidth: 700 }} className='desc-table'>
						<TableHead>
							<TableRow >
								<TableCell colSpan={5} className='countdown'>
									<Countdown
										key={Date.now() + nextTimer}
										date={Date.now() + nextTimer}
										intervalDelay={0}
										precision={3}
										renderer={timerRenderer}
									/>
								</TableCell>
							</TableRow>

							{
								json.data[i].art.use !== ''

								?
									<TableRow>
										<TableCell colSpan={5} className='use' style={{color:color}}>
											{json.data[i].art.use}
										</TableCell>
									</TableRow>
								:
									<></>
							}
							
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell className='title'>
									{json.data[i].art.title}
								</TableCell>
								<TableCell className='name'>
									{json.data[i].artist.name}
								</TableCell>
								<TableCell className='qr'>
									<img src={nextQrImage} alt={json.data[i].artist.name+" site"} />
								</TableCell>
							</TableRow>
							
							<TableRow>
								<TableCell colSpan={5} className='desc'>
									{json.data[i].art.desc}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				{/* <table className='desc-wrap'>
					<tr>
						<td>
							<Countdown
								className='countdown'
								key={Date.now() + nextTimer}
								date={Date.now() + nextTimer}
								intervalDelay={0}
								precision={3}
								renderer={timerRenderer}
							/>
						</td>
					</tr>
					<tr>
						<td className='title'>
							{json.data[i].art.title}
						</td>
						<td className='name'>

						</td>
						<td className='qr'>

						</td>
					</tr>
					<tr>
						<td className='desc'>
							{json.data[i].art.desc}
						</td>
					</tr>
				</table> */}
				{/* <h2 className='title'>
					{json.data[i].art.title}
				</h2>
				<h2 className='name'>
					{json.data[i].artist.name}
				</h2>
				<div className='qr'>
					<img src={nextQrImage} alt={json.data[i].artist.name+" site"} />
				</div>
				<h2 className='desc'>
					{json.data[i].art.desc}
				</h2> */}
			
			</div>
		</>
	)
}

export default App
