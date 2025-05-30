"use client";

//! for now we are deciding to not dumb down machines just to make color mode stay with language change
//! untill it fixed with route paramters eventually

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import dynamic from 'next/dynamic';

import { Flex, ToggleButton , Switch2, ToggleButton3,ToggleButton4} from "@/once-ui/components"
import styles from './Header.module.scss'

import { routes, display } from '@/app/resources'

import { routing } from '@/i18n/routing';
import { Locale, usePathname, useRouter } from '@/i18n/routing';
import { renderContent } from "@/app/resources";
import { useTranslations } from "next-intl";
import { i18n } from "@/app/resources/config";
import { useConfig } from '@/app/contexts/ConfigContext';
import ColorPalette from '@/components/Colorpalette'
import { color } from "framer-motion";
import GlassIcons from "@/reactbits/glassIcons/glassIcons";

// Dynamically import TimeDisplay with SSR disabled
const TimeDisplay = dynamic(() => import('./TimeDisplay'), { ssr: false });


export const Header = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname() ?? '';
    const params = useParams();
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const {config, setConfig } = useConfig();
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const [showVideo, setShowVideo] = useState(false);


    

    const colorLabelFromBacklight = (backlight: string): string => {
        console.log('color for buttons',backlight);
        if (backlight === 'rgba(0, 0, 0, 0)') return 'gray';
        else if (backlight === 'rgba(0, 0, 255, 0.2)') return 'blue';
        else if (backlight === 'rgba(75, 0, 130, 0.27)') return 'indigo';
        else if (backlight === 'rgba(255, 0, 255, 0.27)') return 'purple';
        else if (backlight === 'rgba(222, 152, 136, 0.2)') return 'brown'; // Close to skin tone / red-orange
        else if (backlight === 'rgba(255, 0, 0, 0.24)') return 'red';
        else if (backlight === 'rgba(255, 166, 0, 0.24)') return 'orange';
        else if (backlight === 'rgba(255, 255, 0, 0.24)') return 'yellow'; // Yellow treated like orange
        else if (backlight === 'rgba(80, 200, 120, 0.24)') return 'green';
        else if (backlight === 'rgba(0, 255, 255, 0.17)') return 'cyan'; // Cyan close to blue
        else return 'blue'; // default fallback
    };

    const colorLabel = colorLabelFromBacklight(config.backlight.color);


    const items = [
        { icon: 'github', color: colorLabel, label: 'Github' ,link:'https://github.com/Wishwa-code'},
        { icon: 'linkedin', color: colorLabel, label: 'Linkedin',link:'https://www.linkedin.com/in/wishwa-kankanamge/' },
        { icon: 'email' , color: colorLabel, label: 'Email' ,link:'mailto:wishwakankankanmge129@gmail.com'},
        { icon: 'cv', color: colorLabel, label: 'Resume' ,link:'https://drive.google.com/file/d/1Pt1qND1S-kxdRcx6IjDaZcus8LVYeCwx/view?usp=sharing'},

        ];

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
        if (window.innerWidth > 768) {
            setShowVideo(true);
        }
  
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
                    // padding="4"
                    justifyContent="start"
                    >
                    <Flex
                        direction ="column"
                        style={{
                        height: "50px",
                    }}>
                        <Flex
                        hide="s"
                        paddingLeft="24" 
                        paddingTop="12" 
                        alignItems="center"
                        textVariant="body-default-s">
                        { display.location && (
                            <>{person.location}</>
                        )}
                        </Flex>
                        <Flex
                            hide="s"
                            paddingLeft="24" 
                            paddingTop="4" 
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
                    <div style={{ width: '225px', height: '1px',  margin: '8px 0' , backgroundColor: 'var(--neutral-alpha-medium)' }} />
                    <Flex
                        style={{
                        height: "50px",
                        }}>
                    </Flex>
                    <div style={{ width: '225px', height: '1px',  margin: '8px 0 ' , backgroundColor: 'var(--neutral-alpha-medium)' }} />
                    <Flex
                    // style={{ width: '225px'}}
                    fillWidth
                        direction="column"
                        gap="12"
                        // paddingLeft="8" 
                        paddingTop="4" 
                        paddingBottom="8" 
                        textVariant="body-default-s"
                        justifyContent="start"
                        alignItems="center">
                        { routes['/'] && (
                            <ToggleButton4
                                prefixIcon="home"
                                href={`/${params?.locale}`}
                                selected={pathname === "/"}>
                                <Flex paddingX="2" hide="s">{home.label}</Flex>
                            </ToggleButton4>
                        )}
                        { routes['/about'] && (
                            <ToggleButton4
                                prefixIcon="person"
                                href={`/${params?.locale}/about`}
                                selected={pathname === "/about"}>
                                <Flex paddingX="2" hide="s">{about.label}</Flex>
                            </ToggleButton4>
                        )}
                        { routes['/work'] && (
                            <ToggleButton4
                                prefixIcon="grid"
                                href={`/${params?.locale}/work`}
                                selected={pathname.startsWith('/work')}>
                                <Flex paddingX="2" hide="s">{work.label}</Flex>
                            </ToggleButton4>
                        )}
                        { routes['/blog'] && (
                            <ToggleButton4
                                prefixIcon="book"
                                href={`/${params?.locale}/blog`}
                                selected={pathname.startsWith('/blog')}>
                                <Flex paddingX="2" hide="s">{blog.label}</Flex>
                            </ToggleButton4>
                        )}
                        { routes['/gallery'] && (
                            <ToggleButton
                                prefixIcon="gallery"
                                href={`/${params?.locale}/gallery`}
                                selected={pathname.startsWith('/gallery')}>
                                <Flex paddingX="2" hide="s">{gallery.label}</Flex>
                            </ToggleButton>
                        )} 
                        </Flex>
                        <div style={{ width: '225px', height: '1px',  margin: '4px 0' , backgroundColor: 'var(--neutral-alpha-medium)' }} />
     
                            <Flex 
                                className={`${styles.overlayCard} ${styles.absoluteOverlay}`}
                                padding="0"
                                paddingTop="8" 
                                gap="8"
                                direction="column"
                                justifyContent="center"
                                alignItems="center">
                                
                                {windowSize.width > 768 ? ( 
                                    <>
                                        
                                        {showVideo && (<div style={{ position: 'relative', height: '100px', marginBottom: '7px', overflow: 'hidden' }}>
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    zIndex: 0,
                                                }}
                                                src={config.style.theme === 'dark'
                                                    ? "/images/utils/dark_bg.mp4"
                                                    : "/images/utils/light_bg.mp4"}
                                            />
                                            <Switch2
                                                isChecked={config.style.theme === 'dark'}
                                                onToggle={handleThemeChange}
                                                iconChecked="dark"
                                                iconUnchecked="light"
                                                ariaLabel="Toggle switch example"
                                                className="custom-switch-class"
                                                label="Switch Label"
                                                style={{
                                                    position: 'relative',
                                                    zIndex: 1, 
                                                    marginTop: '25px', // ensure it's above the video
                                                }}
                                            />
                                        </div>)}
          
                                        <Flex
                                        marginBottom="8"
                                        >
                                            <ColorPalette/>

                                        </Flex>
                                        
                                        
                                    </>
                                ) : (
                                    <>  
                                        
                                            <ColorPalette/>
                                        

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
                                                    padding="4" gap="2" fillWidth
                                                    justifyContent="center">
                                                        {i18n && routing.locales.map((locale, index) => (
                                                            <ToggleButton
                                                                key={index}
                                                                selected={params?.locale === locale}
                                                                onClick={() => handleLanguageChange(locale)}
                                                                className={isPending && 'pointer-events-none opacity-60' || ''}
                                                                style={{
                                                                    width : '100%'
                                                                    // backgroundColor: config.style.theme === 'dark' ? 'black' : 'white',
                                                                }}
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
            
                            <div style={{ width: '225px', height: '1px',  margin: '8px 0' , backgroundColor: 'var(--neutral-alpha-medium)' }} />
                            
                                {routing.locales.length > 1 && 
                                    <Flex
                                        style={{ borderColor: 'var(--neutral-alpha-medium)' }}
                                        background="transparent"  borderStyle="solid-1" 
                                        padding="8" gap="2"  margin="12"
                                        justifyContent="center" alignItems="center">
                                            {i18n && routing.locales.map((locale, index) => (
                                                <ToggleButton
                                                    key={index}
                                                    selected={params?.locale === locale}
                                                    onClick={() => handleLanguageChange(locale)}
                                                    className={isPending && 'pointer-events-none opacity-60' || ''}
                                                    style={{
                                                                    width : '80%'
                                                                    // backgroundColor: config.style.theme === 'dark' ? 'black' : 'white',
                                                                }}
                                                >
                                                    {index === 1 ? 'සිං' : locale.toUpperCase()}
                                                </ToggleButton>
                                            ))}
                                    </Flex>
                                }
                                <GlassIcons items={items} className="custom-class"/>
                                  
                    
                </Flex>
                
        </Flex>
    )
}