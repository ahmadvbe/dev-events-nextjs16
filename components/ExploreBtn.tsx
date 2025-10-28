'use client';
//1:18:20 Explore Buttn nextjs/components/ExploreBtn.tsx
import Image from "next/image";

const ExploreBtn = () => {
    return (
        <button 
            type="button"  //1:20:50
            id="explore-btn"
            className="mt-7 mx-auto" 
            onClick={() => //functionalities r required for this button 1:19:10 => client component 1:19:24
                console.log('CLICK')}>
            <a  //1:21:10
                href="#events">
                Explore Events
                <Image 
                    src="/icons/arrow-down.svg" 
                    alt="arrow-down" 
                    width={24} height={24} />
            </a>
        </button>
    )
}

export default ExploreBtn
