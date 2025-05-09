"use client";

//! for now we are deciding to not dumb down machines just to make color mode stay with language change
//! untill it fixed with route paramters eventually

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Flex, ToggleButton , Switch2, ToggleButton3} from "@/once-ui/components"
import styles from '@/components/Header.module.scss'

import { routes, display } from '@/app/resources'

import { routing } from '@/i18n/routing';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";
import { useConfig } from '@/app/contexts/ConfigContext';
import ColorPalette from '@/components/Colorpalette'

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
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { config, setConfig } = useConfig();
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

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

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible); // Toggle menu visibility
    };

    useEffect(() => {
        console.log('Current theme from config:', config.style.theme);
        document.documentElement.setAttribute('data-theme', config.style.theme);
  
      }, [config]);

    const handleThemeChange = () => {
        
        const newTheme = (config.style.theme === 'dark' ? 'light' : 'dark') as 'light' | 'dark';

        setConfig((prevConfig: any) => ({
            ...prevConfig,
            style: {
                ...prevConfig.style,
                theme: newTheme
            }
        }));
        // @ts-ignore
        // document.documentElement.setAttribute('data-theme', theme);
        // setTheme(newTheme);

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
        <Flex style={{height: '100vh'}}
            className={styles.position}
            as="header"
            direction="column"
            zIndex={9}
            padding="8"
            justifyContent="center">
            <ToggleButton3
                className={styles.menuButton}
                prefixIcon="Menu"
                onClick={toggleMenu}
                selected={isMenuVisible}
            >
            </ToggleButton3>
                <Flex
                    className={`${styles.menuContainer} ${isMenuVisible ? styles.show : ''}`}
                    style={{
                        height: '100vh',
                    }}
                    direction="column"
                    background="surface" 
                    border="neutral-medium" 
                    borderStyle="solid-1" 
                    // topRadius="xs" 
                    shadow="l"
                    padding="4"
                    justifyContent="center"
                    >

                    <Flex
                    >
                    <Flex
                        direction="column"
                        gap="4"
                        textVariant="body-default-s"
                        justifyContent="start"
                        alignItems="start">
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
                            prefixIcon="settings" // You can change this icon as needed
                            onClick={toggleOverlay}
                            selected={isOverlayVisible} // Show overlay on click
                        >
                            
                        </ToggleButton>
                        
                        {isOverlayVisible && (
                            <Flex 
                                className={`${styles.overlayCard} ${styles.absoluteOverlay}`}
                                background="surface" 
                                border="neutral-medium" 
                                borderStyle="solid-1" 
                                radius="m-4" 
                                shadow="l"
                                padding="16"
                                gap="8"
                                direction="column"
                                justifyContent="center"
                                alignItems="center">
                                
                                {windowSize.width > 768 ? ( 
                                    <>
                                        <Flex 
                                        paddingBottom="16"
                                        >
                                            {routing.locales.length > 1 && 
                                                <Flex
                                                    
                                                    background="neutral-medium" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
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
                                        </Flex>
                                        <Switch2
                                            isChecked={config.style.theme === 'dark'}
                                            onToggle={() => handleThemeChange()}
                                            iconChecked="dark"
                                            iconUnchecked="light"
                                            ariaLabel="Toggle switch example"
                                            className="custom-switch-class"
                                            label="Switch Label"
                                        />
                            
                                        <Switch2
                                            isChecked={config.backlight.state === 'true'}
                                            onToggle={() => handleColorChange(config.backlight.state === 'true' ? 'false' : 'true', 'state')}
                                            iconChecked="spotlighton"
                                            iconUnchecked="spotlightoff"
                                            ariaLabel="Toggle switch example"
                                            className="custom-switch-class"
                                            label="Switch Label"
                                        />
                                        {config.backlight.state === 'true' && (
                                            <ColorPalette/>
                                        )}
                                        {/* Close Button */}
                                        <Flex 
                                        justifyContent="center"
                                        paddingTop="8"
                                        paddingBottom="4">
                                            {/* @ts-nocheck */}
                                            <ToggleButton
                                                prefixIcon="close"
                                                onClick={toggleOverlay}
                                                selected={false}
                                            >
                                                <Flex paddingX="2" hide="s">Close</Flex>
                                            </ToggleButton>
                                        </Flex>
                                    </>
                                ) : (
                                    <>  
                                        {config.backlight.state === 'true' && (
                                            <ColorPalette/>
                                        )}
                                        <Switch2
                                                isChecked={config.backlight.state === 'true'}
                                                onToggle={() => handleColorChange(config.backlight.state === 'true' ? 'false' : 'true', 'state')}
                                                iconChecked="spotlighton"
                                                iconUnchecked="spotlightoff"
                                                ariaLabel="Toggle switch example"
                                                className="custom-switch-class"
                                                label="Switch Label"
                                        />
                                        <Switch2
                                        isChecked={config.style.theme === 'dark'}
                                        onToggle={() => handleThemeChange()}
                                        iconChecked="dark"
                                        iconUnchecked="light"
                                        ariaLabel="Toggle switch example"
                                        className="custom-switch-class"
                                        label="Switch Label"
                                        />
                                        <Flex 
                                        paddingTop="4"
                                        >
                                            {routing.locales.length > 1 && 
                                                <Flex
                                                    
                                                    background="neutral-medium" 
                                                    border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
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
                                        </Flex>
                                        {/* Close Button */}
                                        <Flex 
                                        justifyContent="center"
                                        paddingBottom="4"
                                        paddingTop="8">
                                            {/* @ts-nocheck */}
                                            <ToggleButton
                                                prefixIcon="close"
                                                onClick={toggleOverlay}
                                                selected={false}
                                            >
                                                <Flex paddingX="2" hide="s">Close</Flex>
                                            </ToggleButton>
                                        </Flex>
                                            </>
                                        )}
                                
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Flex
                    hide="s"
                    paddingLeft="12" 
                    alignItems="center"
                    textVariant="body-default-s">
                    { display.location && (
                        <>{person.location}</>
                    )}
                    </Flex>
                    <Flex
                        hide="s"
                        paddingRight="12" fillWidth
                        justifyContent="flex-start" alignItems="center"
                        textVariant="body-default-s"
                        gap="20">
                        <Flex hide="s">
                            { display.time && (
                                <TimeDisplay timeZone={person.location}/>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
        </Flex>
    )
}