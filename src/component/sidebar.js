import React from "react";
import "../style/sidebar.css"
import { useState, useEffect, useRef } from "react";
import {
    IconAdjustmentsHorizontal, IconBorderAll, IconCircleSquare,
    IconMessageCircle2, IconMoonStars, IconSmoking, IconGlassFull,
    IconVolume2, IconVolume
} from "@tabler/icons"
import { faL } from "@fortawesome/free-solid-svg-icons";
const SideBar = () => {
    const [isShow, setIsShow] = useState(true);
    const [classname, setClassname] = useState("");
    const [a, setA] = useState(0);
    let b = 0;
    const handelClick = (e) => {
        b++
        setIsShow(false)
        setClassname(e.target.classList[1])
        if (classname == e.target.classList[1] && b < 2) {
            setIsShow(true)
        }
        console.log(classname)

    }
    return (
        <div className="sidebar">
            <div className={`icon-sidebar iconVolume controls ${classname == "iconVolume" && !isShow && "active"}`} onClick={(e) => handelClick(e)}>
                <IconAdjustmentsHorizontal color="white" />
                <div className={`mood ${isShow && "hide"}`} onClick={(e) => e.stopPropagation()}>
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
                        <input type="range" className="volume-mood" />
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
            <div className={`icon-sidebar iconPlayList ${classname == "iconPlayList" && !isShow && "active"}`} onClick={(e) => handelClick(e)}>
                <IconBorderAll color="white" />

            </div>
            <div className={`icon-sidebar iconChangeSet ${classname == "iconChangeSet" && !isShow && "active"}`} onClick={(e) => handelClick(e)}>
                <IconCircleSquare color="white" />
            </div>
            <div className={`icon-sidebar iconMessenger ${classname == "iconMessenger" && !isShow && "active"}`} onClick={(e) => handelClick(e)}>
                <IconMessageCircle2 color="white" />
            </div>
        </div>
    )
}
export default SideBar