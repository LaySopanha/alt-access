"use client"

import React from "react"
import { motion } from "framer-motion"

export function AccessibilityGraphic({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background elements */}
            <rect width="800" height="600" fill="transparent" />

            {/* Central Circle */}
            <motion.circle
                cx="400"
                cy="300"
                r="60"
                stroke="black"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Pulsing Outer Rings */}
            {[1, 2, 3].map((i) => (
                <motion.circle
                    key={i}
                    cx="400"
                    cy="300"
                    r={60 + i * 40}
                    stroke="black"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0.5, 1.5],
                    }}
                    transition={{
                        duration: i === 1 ? 3 : 4, // Vary duration slightly
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut",
                    }}
                />
            ))}

            {/* Connection Lines and Orbiting Icons */}
            {[
                { angle: 0, label: "Keyboard" },
                { angle: 72, label: "Vision" },
                { angle: 144, label: "Hearing" },
                { angle: 216, label: "Mobility" },
                { angle: 288, label: "Cognition" },
            ].map((item, i) => {
                const radius = 180
                const x = Math.round((400 + radius * Math.cos((item.angle * Math.PI) / 180)) * 1e6) / 1e6
                const y = Math.round((300 + radius * Math.sin((item.angle * Math.PI) / 180)) * 1e6) / 1e6

                return (
                    <g key={i}>
                        {/* Line to center */}
                        <motion.line
                            x1="400"
                            y1="300"
                            x2={x}
                            y2={y}
                            stroke="black"
                            strokeWidth="1"
                            strokeDasharray="5 5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.2 }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                        />

                        {/* Orbiting nodes */}
                        <motion.circle
                            cx={x}
                            cy={y}
                            r="20"
                            fill="white"
                            stroke="black"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.5 + i * 0.2,
                            }}
                        />

                        {/* Accent dots that slide along lines */}
                        <motion.circle
                            r="4"
                            fill="#D55E00" // Wong Vermilion
                            animate={{
                                cx: [400, x],
                                cy: [300, y],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "linear",
                            }}
                        />

                        {/* Text Labels (Small) */}
                        <motion.text
                            x={x}
                            y={y + 45}
                            textAnchor="middle"
                            fill="black"
                            fontSize="10"
                            fontWeight="bold"
                            style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "monospace" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1 + i * 0.2 }}
                        >
                            {item.label}
                        </motion.text>
                    </g>
                )
            })}

            {/* Center Symbol */}
            <motion.path
                d="M385 300 L395 310 L415 290"
                stroke="#D55E00"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 2 }}
            />

            <text
                x="400"
                y="335"
                textAnchor="middle"
                fill="black"
                fontSize="14"
                fontWeight="900"
                style={{ textTransform: "uppercase", letterSpacing: "0.3em", fontFamily: "sans-serif" }}
            >
                ALL
            </text>
        </svg>
    )
}
