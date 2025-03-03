"use client";

//! for now we are deciding to not dumb down machines just to make color mode stay with language change
//! untill it fixed with route paramters eventually

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Flex, ToggleButton } from "@/once-ui/components"
import styles from '@/components/Header.module.scss'

import { routes, display } from '@/app/resources'

import { routing } from '@/i18n/routing';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";
import { useConfig } from '@/app/contexts/ConfigContext';

type TimeDisplayProps = {
    timeZone: string;
    locale?: string;  // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = 'en-GB' }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const timeString = new Intl.DateTimeFormat(locale, options).format(now);
            setCurrentTime(timeString);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, [timeZone, locale]);

    return (
        <>
            {currentTime}
        </>
    );
};

export default TimeDisplay;

export const Header = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname() ?? '';
    const params = useParams();
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const { config, setConfig } = useConfig();

    function handleLanguageChange(locale: string) {
        const nextLocale = locale as Locale;
        startTransition(() => {
            router.replace(
                pathname,
                {locale: nextLocale}
            )
        })
    }

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible); // Toggle overlay visibility
    };

    const handleThemeChange = (theme: string) => {
        // Update URL with the new theme parameter
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set('mode', theme);
        document.documentElement.setAttribute('data-theme', theme);
        // Use router.push instead of replace to trigger a re-render
        // startTransition(() => {
        //     router.push(
        //         `${pathname}?${newSearchParams.toString()}`,
        //         { locale: params?.locale as Locale }
        //     );
        // });
    };

    const handleColorChange = (newChange: string, change: 'state' | 'color') => {
        setConfig((prevConfig: any) => ({
            ...prevConfig,  // Keep all existing config values
            backlight: {
                ...prevConfig.backlight, // Keep other accent properties if any
                [change]: newChange  // Use the change parameter as the key
            }
        }));
        console.log(`Backlight ${change} changed to:`, newChange);
    };

    const t = useTranslations();
    const { person, home, about, blog, work, gallery } = renderContent(t);

    return (
        <Flex style={{height: 'fit-content'}}
            className={styles.position}
            as="header"
            zIndex={9}
            fillWidth padding="8"
            justifyContent="center">
            <Flex
                hide="s"
                paddingLeft="12" fillWidth
                alignItems="center"
                textVariant="body-default-s">
                { display.location && (
                    <>{person.location}</>
                )}
            </Flex>
            <Flex
                background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                padding="4"
                justifyContent="center">
                <Flex
                    gap="4"
                    textVariant="body-default-s">
                    { routes['/'] && (
                        <ToggleButton
                            prefixIcon="home"
                            href={`/${params?.locale}`}
                            selected={pathname === "/"}>
                            <Flex paddingX="2" hide="s">{home.label}</Flex>
                        </ToggleButton>
                    )}
                    { routes['/about'] && (
                        <ToggleButton
                            prefixIcon="person"
                            href={`/${params?.locale}/about`}
                            selected={pathname === "/about"}>
                            <Flex paddingX="2" hide="s">{about.label}</Flex>
                        </ToggleButton>
                    )}
                    { routes['/work'] && (
                        <ToggleButton
                            prefixIcon="grid"
                            href={`/${params?.locale}/work`}
                            selected={pathname.startsWith('/work')}>
                            <Flex paddingX="2" hide="s">{work.label}</Flex>
                        </ToggleButton>
                    )}
                    { routes['/blog'] && (
                        <ToggleButton
                            prefixIcon="book"
                            href={`/${params?.locale}/blog`}
                            selected={pathname.startsWith('/blog')}>
                            <Flex paddingX="2" hide="s">{blog.label}</Flex>
                        </ToggleButton>
                    )}
                    { routes['/gallery'] && (
                        <ToggleButton
                            prefixIcon="gallery"
                            href={`/${params?.locale}/gallery`}
                            selected={pathname.startsWith('/gallery')}>
                            <Flex paddingX="2" hide="s">{gallery.label}</Flex>
                        </ToggleButton>
                    )}
                    <ToggleButton
                        prefixIcon="gallery" // You can change this icon as needed
                        onClick={toggleOverlay}
                        selected={isOverlayVisible} // Show overlay on click
                    >
                        <Flex paddingX="2" hide="s">Settings</Flex>
                    </ToggleButton>
                    
                    {isOverlayVisible && (
                        <Flex 
                            className={`${styles.overlayCard} ${styles.absoluteOverlay}`}
                            background="surface" 
                            border="neutral-medium" 
                            borderStyle="solid-1" 
                            radius="m-4" 
                            shadow="l"
                            padding="4"
                            gap="4"
                            direction="column">
                            
                            {/* Theme Toggle Row */}
                            <Flex gap="2" justifyContent="center">
                                <ToggleButton
                                    prefixIcon="gallery"
                                    selected={document.documentElement.getAttribute('data-theme') === 'light'}
                                    onClick={() => handleThemeChange('light')}
                                >
                                    <Flex paddingX="2" hide="s">Light</Flex>
                                </ToggleButton>
                                <ToggleButton
                                    prefixIcon="gallery"
                                    selected={document.documentElement.getAttribute('data-theme') === 'dark'}
                                    onClick={() => handleThemeChange('dark')}
                                >
                                    <Flex paddingX="2" hide="s">Dark</Flex>
                                </ToggleButton>
                            </Flex>

                            {/* Bulb Toggle Row */}
                            <Flex gap="2" justifyContent="center">
                                <ToggleButton
                                    prefixIcon="gallery"
                                    selected={config.backlight.state === 'true'}
                                    onClick={() => handleColorChange(config.backlight.state === 'true' ? 'false' : 'true', 'state')}
                                >
                                    <Flex paddingX="2" hide="s">Bulb</Flex>
                                </ToggleButton>
                            </Flex>

                            {/* Color Selection Row */}
                            <Flex gap="2" justifyContent="center">
                                <ToggleButton
                                    prefixIcon="gallery"
                                    selected={config.backlight.color === 'red'}
                                    onClick={() => handleColorChange('red', 'color')}
                                >
                                    <Flex paddingX="2" hide="s">Red</Flex>
                                </ToggleButton>
                                <ToggleButton
                                    prefixIcon="gallery"
                                    selected={config.backlight.color === 'green'}
                                    onClick={() => handleColorChange('green', 'color')}
                                >
                                    <Flex paddingX="2" hide="s">Green</Flex>
                                </ToggleButton>
                                <ToggleButton
                                    prefixIcon="gallery"
                                    selected={config.backlight.color === 'blue'}
                                    onClick={() => handleColorChange('blue', 'color')}
                                >
                                    <Flex paddingX="2" hide="s">Blue</Flex>
                                </ToggleButton>
                            </Flex>

                            {/* Close Button */}
                            <Flex justifyContent="center">
                                {/* @ts-nocheck */}
                                <ToggleButton
                                    prefixIcon="close"
                                    onClick={toggleOverlay}
                                    selected={false}
                                >
                                    <Flex paddingX="2" hide="s">Close</Flex>
                                </ToggleButton>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </Flex>
            <Flex
                hide="s"
                paddingRight="12" fillWidth
                justifyContent="flex-end" alignItems="center"
                textVariant="body-default-s"
                gap="20">
                {routing.locales.length > 1 && <Flex
                    
                    background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                    padding="4" gap="2"
                    justifyContent="center">
                        {i18n && routing.locales.map((locale, index) => (
                            <ToggleButton
                                key={index}
                                selected={params?.locale === locale}
                                onClick={() => handleLanguageChange(locale)}
                                className={isPending && 'pointer-events-none opacity-60' || ''}
                            >
                                {index === 1 ? 'සිං' : locale.toUpperCase()}
                            </ToggleButton>
                        ))}
                    </Flex>
                }
                <Flex hide="s">
                    { display.time && (
                        <TimeDisplay timeZone={person.location}/>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}