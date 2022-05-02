import React from "react";
import "../style/sidebar.css"
import { useState, useEffect, useRef } from "react";
import {
    IconAdjustmentsHorizontal, IconBorderAll, IconCircleSquare,
    IconMessageCircle2, IconMoonStars, IconSmoking, IconGlassFull,
    IconVolume2, IconVolume, IconPlayerPlay
} from "@tabler/icons"
import { faL } from "@fortawesome/free-solid-svg-icons";
const SideBar = (props) => {
    const [classname, setClassname] = useState("");
    const listNameMusic = ["Chúng Ta Của Hiện Tại", "Hẹn Kiếp Sau", "Đau ở đây này", "Họ Yêu Ai Mât Rồi", "Thất thế"]
    const [a, setA] = useState(0);
    const mood = useRef();
    const listMusicBar = useRef();
    const [isChoose, setIsChoose] = useState(0)
    const checkActive = (e) => {
        if (e.target.classList[2] == "active") {
            e.target.classList.remove("active")
        } else {
            e.target.classList.add("active")
        }
    }
    const handelClick = (e, a, b) => {
        setClassname(e.target.classList[1])
        checkActive(e)
        if (e.target.classList[1] !== b) {
            return
        }
        if (a.current.style.display == "block") {
            a.current.style.display = "none";
        } else {
            a.current.style.display = "block";
        }

    }
    const handelChangeRange = (e) => {
        props.changeVolume(e)
    }
    const chooseMusic = (id) => {
        props.choosemusic(id)
        setIsChoose(id)
        console.log(isChoose)
    }
    const EListMusic = (a) => {
        return a.map((user, index) => {
            return (
                <h2 key={index} className={`music`} onClick={(e) => chooseMusic(index)}>
                    <IconPlayerPlay className="icon-music" />
                    <span className={`name-music ${isChoose == index && "animusic"}`} >{user}</span>
                </h2>
            )
        })
    }
    return (
        <div className="sidebar">
            <div className={`icon-sidebar iconVolume  ${classname == "iconVolume" && "active"} controls`} onClick={(e) => handelClick(e, mood, "iconVolume")} title="volume">
                <IconAdjustmentsHorizontal color="white" />
                <div className={`mood`} style={{ display: `${classname !== "iconVolume" && "none"}` }} onClick={(e) => e.stopPropagation()} ref={mood}>
                    <h1>Mood</h1>
                    <div className="list-moon">
                        <div className="moon-bar ">
                            <IconMoonStars />
                            <h2>Sleep</h2>
                        </div>
                        <div className="moon-bar">
                            <IconSmoking />
                            <h2>Jazzy</h2>
                        </div>
                        <div className="moon-bar">
                            <IconGlassFull />
                            <h2>Chill</h2>
                        </div>
                    </div>
                    <div className="volume-sidebar">
                        <IconVolume2 />
                        <input type="range" className="volume-mood" onChange={(e) => handelChangeRange(e)} />
                        <IconVolume />
                    </div>
                    <h1>Background noise</h1>
                    <div className="background-noise">
                        <div className="list-background">
                            <div className="background ">
                                <h3>City traffic</h3>
                                <input type="range" />
                            </div>
                            <div className="background">
                                <h3>City Rain</h3>
                                <input type="range" />
                            </div>
                            <div className="background">
                                <h3>Keyboard</h3>
                                <input type="range" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`icon-sidebar iconPlayList ${classname == "iconPlayList" && "active"}`} onClick={(e) => handelClick(e, listMusicBar, "iconPlayList")} title="list music">
                <IconBorderAll color="white" />
                <div className="list-music-bar flexMusic" ref={listMusicBar} style={{ display: `${classname !== "iconPlayList" && "none"}` }} onClick={(e) => e.stopPropagation()}>
                    <h1 className="caption-list">LIST MUSIC</h1>
                    <div className="part-mucsic flexMusic">
                        {EListMusic(listNameMusic)}
                    </div>
                </div>
            </div>
            <div className={`icon-sidebar iconChangeSet ${classname == "iconChangeSet" && "active"}`} onClick={(e) => handelClick(e)}>
                <IconCircleSquare color="white" />
            </div>
            <div className={`icon-sidebar iconMessenger ${classname == "iconMessenger" && "active"}`} onClick={(e) => handelClick(e)}>
                <IconMessageCircle2 color="white" />
            </div>
        </div>
    )
}
export default SideBar