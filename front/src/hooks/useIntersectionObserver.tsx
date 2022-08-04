import React, { useEffect, useState } from "react";

export default function useIntersecting(ref: React.RefObject<HTMLInputElement>) {

    const [isIntersecting, setIntersecting] = useState(false)
    const options = {}

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting), options
    )

    useEffect(() => {
        observer.observe(ref.current)
        return () => {
            observer.disconnect()
        }
    }, [])

    return isIntersecting
}