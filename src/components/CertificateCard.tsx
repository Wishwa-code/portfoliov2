"use client";

import { AvatarGroup, Flex, Heading, RevealFx, SmartImage, SmartLink, Text } from "@/once-ui/components";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

interface CertificateCardProps {
    href: string;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
    href,
    images = [],
    title,
    content,
    description,
    avatars
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const t = useTranslations();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleImageClick = () => {
        if(images.length > 1) {
            setIsTransitioning(false);
            setTimeout(() => {
                const nextIndex = (activeIndex + 1) % images.length;
                setActiveIndex(nextIndex);
                setTimeout(() => {
                    setIsTransitioning(true);
                }, 630);
            }, 630);
        }
    };
    
    const handleControlClick = (index: number) => {
        if (index !== activeIndex) {
            setIsTransitioning(true);
            setTimeout(() => {
                setActiveIndex(index);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 630);
            }, 630);
        }
    };

    return (
    <>
        {images.map((image, index) => (
            <SmartImage
                key={index}
                className="my-10"
                enlarge
                radius="m"
                alt={title}
                aspectRatio="16 / 9"
                src={image}
                style={{
                    height: '500px',
                    border: '1px solid var(--neutral-alpha-weak)',
                    ...(images.length > 1 && {
                        cursor: 'pointer',
                    }),
                }}
            />
        ))}
    </>
    );
};