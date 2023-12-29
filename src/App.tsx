import './App.css'

import { useEffect, createRef, useRef } from 'react'

const constrains = {
	video: true,
	audio: true
}

export default function App() {
	const ref = createRef<HTMLVideoElement>()
	const streamRef = useRef<MediaStream | null>()

	useEffect(() => {
		// Need to get the media stream somehow
		console.log({ streamRef })
	}, [streamRef])


	const getStreams = async () => {
		try {
			const streams = await navigator.mediaDevices.getUserMedia(constrains)
			if (streamRef.current) {
				streamRef.current = streams
			}
			if (ref.current) {
				ref.current.srcObject = streams
				ref.current.autoplay = true
			}
		} catch (err) {
			alert(err)
		}
	}

	const closeStream = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop())
			// Todo: streamRef.current = null
		}
	}

	return (
		<main>
			Google Meet Clone

			<video ref={ref} src={streamRef.current} playsinline autoplay={true} controls={false} />
			<div>
				<button onClick={getStreams}>Get Video</button>
				<button onClick={closeStream}>Stop Video</button>
			</div>
		</main>
	)
}