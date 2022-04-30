import "../style/header.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import logo from "../video/logo.gif";
import pause from "../video/pause.4ac709263a083f4039b11e120950f9d3.svg"
import left from "../video/left.svg"
import play from "../video/play.svg"
import next from "../video/next.svg"
import chungtacuahientai from "../video/music/chungtacuahientai.m4a"
import henkiepsau from "../video/music/HenKiepSau-KhaHiep-7017276.mp3"
import dauodaynay from "../video/music/Dau O Day Nay - Nal.mp3"
import hoyeuaimatroi from "../video/music/HoYeuAiMatRoiLofiVersion-DoanHieuMrPaa-6973827.mp3"
import { IconSun, IconShare, IconSquare, IconMenu2, IconMoon } from '@tabler/icons';
const Header = () => {
    const [list, setList] = useState({
        playing: false,
        url: "https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Interior+-+Sunny+Day.mp4",
        controls: true,
        volume: 1,
        loop: true
    })
    const [isplay, setIsplay] = useState(true)
    const [ismove, setIsmove] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0)
    const listUrlAudio = [chungtacuahientai, henkiepsau, dauodaynay, hoyeuaimatroi];
    const [urlAudio, setUrlAudio] = useState(listUrlAudio[0])
    const [id, setId] = useState(0)
    useEffect(() => {
        audioRef.current.volume = 0.5
    }, [])
    const handelAddMove = () => {
        setList({
            ...list,
            playing: true
        })
        setIsmove(!ismove)
    }
    const handelChangeRange = (e) => {
        setVolume(e.target.value / 100)
        audioRef.current.volume = volume
    }
    const audioRef = useRef();
    const handelIsplay = () => {
        setIsplay(!isplay)
        isplay ? audioRef.current.play() : audioRef.current.pause();
        if (audioRef.current.ended) {
            setIsplay(true)
        }
        setList({
            ...list,
            playing: true
        })
    }
    const handelNext = () => {
        console.log(id)
        if (id > 3) {
            return
        }
        setId(id + 1)
        setUrlAudio(listUrlAudio[id])
        setIsplay(true)
    }
    const handeComeBack = () => {
        console.log(id)
        if (id < 0) {
            return
        }
        setId(id - 1)
        setUrlAudio(listUrlAudio[id])
        setIsplay(true)
    }
    return (
        <div className="header">
            <div className="top">
                <div className="logo"></div>
                <div className="taskbar">
                    <div className="container" style={{ backgroundColor: ismove ? "#f3a952" : "#ffffff2e" }}>
                        <button className={`switch ${ismove && "move"}`} onClick={() => handelAddMove()}></button>
                        <div>
                            {ismove ? <IconSun color="white" className={`sun ${!ismove && "move"}`} /> : <IconMoon color="white" className={`moon ${!ismove && "move"}`} />}
                        </div>
                    </div>
                    <div className="title">Hello world</div>
                    <div className="form">
                        <button className="sign-up">Sign up</button>
                    </div>
                    <div className="share">
                        <IconShare color="white" />
                    </div>
                    <div className="extend">
                        <IconSquare color="white" />
                    </div>
                    <div className="menu">
                        <IconMenu2 color="white" />
                    </div>
                </div>
            </div>
            <div className="background-music">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    playing={list.playing}
                    url={list.url}
                    volume={list.volume}
                    loop={list.loop}
                    style={{ opacity: ismove ? 1 : 0, transition: "0.2s linear" }}
                />
                <div className="volume">
                    <div className="volume-s"></div>
                    <div className="change-volume">
                        <h1>volume</h1>
                        <input type={"range"} className="range" onChange={(e) => handelChangeRange(e)} />
                    </div>
                </div>
            </div>
            <div className="background-music">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    playing={list.playing}
                    url="https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Interior+-+Night.mp4"
                    volume={list.volume}
                    loop={list.loop}
                    style={{
                        opacity: ismove ? 0 : 1, transition: "0.2s linear"
                    }}
                />
            </div>
            <div className="background-music">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    playing={list.playing}
                    url="https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Interior+-+Night.mp4"
                    volume={list.volume}
                    loop={list.loop}
                    style={{
                        opacity: ismove ? 0 : 1, transition: "0.2s linear"
                    }}
                />
            </div>
            <div className="bottom-bar">
                <div className="bottom-title">
                    <p>Music by - lofi.co 2022 ©</p>
                </div>
                <div className="btn-music">
                    <img src={left} onClick={() => handeComeBack()} />
                    <img src={isplay ? play : pause} height="50px" onClick={() => handelIsplay()} />
                    <img src={next} onClick={() => handelNext()} />
                </div>
                <div className="bottom-title">
                    <p>facebook/giagiang.com</p>
                </div>
            </div>
            <audio
                ref={audioRef}
                src={urlAudio}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                controls
                hidden
            />
        </div >
    )
}
export default Header