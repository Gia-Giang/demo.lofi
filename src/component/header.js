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
import tiengmuaroi from "../video/music/Tieng-mua-roi-ti-tach-www_nhacchuongvui_com.mp3"
import thatthe from "../video/music/That The - H-Kray_ Truzg.mp3"
import { IconSun, IconShare, IconSquare, IconMenu2, IconMoon, IconBrandTinder } from '@tabler/icons';
import SideBar from "./sidebar";
const Header = () => {
    const [list, setList] = useState({
        playing: false,
        url: "https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Interior+-+Sunny+Day.mp4",
        controls: true,
        volume: 1,
        loop: true
    })
    const listMenu = ["Login", "Pricing", "Gerenal setting", "contact us", "How it works", "Play list"]
    const videoSun = useRef()
    const videoMoon = useRef()
    const videoRainSun = useRef()
    const audioRain = useRef()
    const toggleMenu = useRef()
    const [isplay, setIsplay] = useState(true)
    const [ismove, setIsmove] = useState(true);
    const [volume, setVolume] = useState(0)
    const listUrlAudio = [chungtacuahientai, henkiepsau, dauodaynay, hoyeuaimatroi, thatthe];
    const [urlAudio, setUrlAudio] = useState(listUrlAudio[0])
    const [id, setId] = useState(1);
    const [isVolumeCity, setIsVolumeCity] = useState(true);
    const ElistMenu = (list) => {
        return list.map((user, index) => {
            return (
                <div key={index} className="part">
                    <span className="icon-part"><IconBrandTinder /></span>
                    <span className="content-part">{user}</span>
                </div>
            )
        })
    }
    useEffect(() => {
        audioRef.current.volume = 0.5;
        if (audioRef.current.ended) {
            setIsplay(true)
        }
    }, [])
    const handelTimeUp = () => {
        if (audioRef.current.ended) {
            setIsplay(true)
        }
    }

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
        videoSun.current.play()
        videoMoon.current.play()
        videoRainSun.current.play()
        setIsplay(!isplay)
        isplay ? audioRef.current.play() : audioRef.current.pause();
        setList({
            ...list,
            playing: true
        })
    }
    const handelNext = () => {
        console.log(id)
        if (id > listUrlAudio.length - 1) {
            return
        }
        setId(id + 1)
        setUrlAudio(listUrlAudio[id])
        setIsplay(true)
    }
    const handeComeBack = () => {
        if (id < 0) {
            return
        }
        setId(id - 1)
        setUrlAudio(listUrlAudio[id])
        setIsplay(true)
    }
    const TimeUpdate = (e) => {
        if (videoSun.current.ended || videoMoon.current.ended) {
            videoMoon.current.play()
            videoSun.current.play()
            videoRainSun.current.play()
        }
    }
    const handelVolumeCity = (e) => {
        e.stopPropagation()
        setIsVolumeCity(!isVolumeCity)
        isVolumeCity ? audioRain.current.play() : audioRain.current.pause()
    }
    const handelVolumeRain = (e) => {
        audioRain.current.volume = e.target.value / 100;
    }
    const handelMenu = (a) => {
        if (a.current.style.display == "block") {
            a.current.style.display = "none";
        } else {
            a.current.style.display = "block";
        }
        console.log(toggleMenu.current.style.display)
    }
    const handelChooseMusic = (id) => {
        setUrlAudio(listUrlAudio[id])
        audioRef.current.pause()
        setIsplay(true)
    }
    return (
        <div className="header">
            <div className="top" >
                <div className="logo"></div>
                <div className="taskbar">
                    <div className="container" style={{ backgroundColor: ismove ? "#f3a952" : "#ffffff2e" }}>
                        <button className={`switch ${ismove && "move"}`} onClick={(e) => handelAddMove(e)} ></button>
                        <div>
                            {ismove ? <IconSun color="white" className={`sun ${!ismove && "move"}`} /> : <IconMoon color="white" className={`moon ${!ismove && "move"}`} />}
                        </div>
                    </div>
                    <div className="title">I'm want you</div>
                    <div className="form augment-opacity">
                        <button className="sign-up">Sign up</button>
                    </div>
                    <div className="share augment-opacity">
                        <IconShare color="white" />
                    </div>
                    <div className="extend augment-opacity">
                        <IconSquare color="white" />
                    </div>
                    <div className="menu augment-opacity" onClick={() => handelMenu(toggleMenu)}>
                        <IconMenu2 color="white" />
                        <div className="pull-main"></div>
                        <div className="list-menu " ref={toggleMenu}>
                            {ElistMenu(listMenu)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="volume" onClick={(e) => handelVolumeCity(e)}>
                <div className="pull-main"></div>
                <div className="change-volume" onClick={(e) => e.stopPropagation()}>
                    <h1>City Rain</h1>
                    <input type={"range"} className={`range ${isVolumeCity && "hide"}`} onChange={(e) => handelVolumeRain(e)} />
                </div>
            </div>
            <div className="background-music">
                <video
                    ref={videoSun}
                    width="100%"
                    height="100%"
                    src={list.url}
                    style={{ opacity: ismove && isVolumeCity ? 1 : 0, transition: "0.2s linear" }}
                    onTimeUpdate={(e) => TimeUpdate(e)}
                />
            </div>
            <div className="background-music">
                <video
                    ref={videoRainSun}
                    width="100%"
                    height="100%"
                    src={"https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Interior+-+Rainy+Day.mp4"}
                    style={{ opacity: !isVolumeCity ? 1 : 0, transition: "0.2s linear" }}
                    onTimeUpdate={(e) => TimeUpdate(e)}
                />
            </div>
            <div className="background-music">
                <video
                    ref={videoMoon}
                    width="100%"
                    height="100%"
                    src="https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/scenes/book-cafe/Interior+-+Night.mp4"
                    style={{
                        opacity: ismove ? 0 : 1, transition: "0.2s linear"
                    }}
                />
            </div>
            <SideBar changeVolume={handelChangeRange} choosemusic={handelChooseMusic} />
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
                onTimeUpdate={() => handelTimeUp()}
                controls
                hidden
            />
            <audio
                ref={audioRain}
                src={tiengmuaroi}
                controls
                hidden
            />
        </div >
    )
}
export default Header