"use client";

import { AvatarGroup, Flex, Heading, RevealFx, SmartImage, SmartLink, Text, Button } from "@/once-ui/components";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
    href: string;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
    sourcelabel: string;
    sourcelink: string;
    sourcelabel2: string,
    sourcelink2: string,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    images = [],
    title,
    content,
    description,
    avatars,
    sourcelabel,
    sourcelink,
    sourcelabel2,
    sourcelink2,
    
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
        <Flex
            fillWidth gap="m"
            direction="column">
            <Flex onClick={handleImageClick}>
            <RevealFx
                    style={{width: '100%'}}
                    delay={0}
                    trigger={isTransitioning}
                    speed="fast">
                    <SmartImage
                        tabIndex={0}
                        radius="l"
                        alt={title}
                        aspectRatio="16 / 9"
                        src={images[activeIndex]}
                        objectFit="contain"
                        style={{
                            border: '1px solid var(--neutral-alpha-weak)',
                            ...(images.length > 1 && {
                                cursor: 'pointer',
                            }),
                        }}/>
                </RevealFx>
            </Flex>
            {images.length > 0 && (
                <Flex
                    gap="4" paddingX="s"
                    fillWidth 
                    justifyContent="center">
                    {images.map((_, index) => (
                        <Flex
                            key={index}
                            onClick={() => handleControlClick(index)}
                            style={{
                                background: activeIndex === index 
                                    ? 'var(--neutral-on-background-strong)' 
                                    : 'var(--neutral-alpha-medium)',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            fillWidth
                            height="2">
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex
                mobileDirection="column"
                fillWidth paddingRight="s" paddingTop="xs" paddingBottom="m" gap="l">
                {title && (
                    <Flex
                        flex={6}>
                        <Heading
                            as="h2"
                            wrap="balance"
                            variant="display-strong-xs">
                            {title}
                        </Heading>
                    </Flex>
                )}
                {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                    <Flex
                        flex={4} direction="column"
                        gap="s">
                            
                        {avatars?.length > 0 && (
                            <Flex hide="s">
                                <AvatarGroup
                                avatars={avatars}
                                size="m"
                                reverseOrder />
                            </Flex>
                        )}
                        {description?.trim() && (
                            <Text
                                wrap="balance"
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                        <Flex
                        flex={7} direction="column"
                        gap="s">
                        {content?.trim() && (
                            <SmartLink
                                prefixIcon="rightarrow"
                                style={{paddingLeft: '0', margin: '0', width: 'fit-content'}}
                                href={href}>
                                    <Text
                                        variant="body-default-s">
                                       {t("projectCard.label")}
                                    </Text>
                            </SmartLink>
                            
                        )}
                            {/* <a href="https://github.com/Wishwa-code/Ceylon2World">Visit Repo</a> */}
                            <SmartLink
                                prefixIcon="link"
                                style={{paddingLeft: '0',margin: '0', width: 'fit-content'}}
                                href={sourcelink}>
                                    <Text
                                        variant="body-default-s">
                                       {sourcelabel}
                                    </Text>
                            </SmartLink>
                            {typeof sourcelabel2 === 'string' && sourcelabel2.trim() && (
                                <SmartLink
                                prefixIcon="link"
                                style={{paddingLeft: '0',margin: '0', width: 'fit-content'}}
                                href={sourcelink2}>
                                    <Text
                                        variant="body-default-s">
                                       {sourcelabel2}
                                    </Text>
                            </SmartLink>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Flex>
            <Flex
				className={styles.projectCardGap }
				fillWidth
				direction="column"
				paddingY="l" gap="m">
					<Flex
						direction="column"
						fillWidth maxWidth="s" gap="m">
					</Flex>
				
			</Flex>
        </Flex>
    );
};