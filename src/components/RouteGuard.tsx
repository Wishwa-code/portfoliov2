"use client";

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { routes, protectedRoutes } from '@/app/resources';
import { Flex, Spinner, Input, Button, Heading } from '@/once-ui/components';
import dynamic from "next/dynamic";
import animationData from '@/../public/lotties/cofee.json';
//  import box

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
    const pathname = usePathname();
    const [isRouteEnabled, setIsRouteEnabled] = useState(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

    useEffect(() => {
        const performChecks = async () => {
            setLoading(true);
            setIsRouteEnabled(false);
            setIsPasswordRequired(false);
            setIsAuthenticated(false);

            const checkRouteEnabled = () => {
                if (!pathname) return false;

                if (pathname in routes) {
                    return routes[pathname as keyof typeof routes];
                }

                const dynamicRoutes = ['/blog', '/work'] as const;
                for (const route of dynamicRoutes) {
                    if (pathname?.startsWith(route) && routes[route]) {
                        return true;
                    }
                }

                return false;
            };

            const routeEnabled = checkRouteEnabled();
            setIsRouteEnabled(routeEnabled);

            if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
                setIsPasswordRequired(true);

                const response = await fetch('/api/check-auth');
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            }

            setLoading(false);
        };

        performChecks();
    }, [pathname]);

    const handlePasswordSubmit = async () => {
        const response = await fetch('/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            setIsAuthenticated(true);
            setError(undefined);
        } else {
            setError('Incorrect password');
        }
    };

    if (loading) {
        return (
        <Flex fillWidth style={{height:'100vh'}}   justifyContent="center" alignItems="center">
            <Flex 
            style={{width:'40vw'}} 
            paddingY="128" 
            justifyContent="center">
                <Lottie animationData={animationData} loop={true} />
            </Flex>
        </Flex>
        );
    }

    if (!isRouteEnabled) {
        return (
        <Flex fillWidth style={{height:'100vh'}}   justifyContent="center" alignItems="center">
            <Flex 
            style={{width:'40vw'}} 
            paddingY="128" 
            justifyContent="center">
                <Lottie animationData={animationData} loop={true} />
            </Flex>
        </Flex>
        );
    }

    if (isPasswordRequired && !isAuthenticated) {
        return (
        <Flex
            fillWidth paddingY="128" maxWidth={24} gap="24"
            justifyContent="center" direction="column" alignItems="center">
            <Heading align="center" wrap="balance">
                {/* This page is password protected */}
                password is password
            </Heading>
            <Input
                id="password"
                type="password"
                label="Enter password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(undefined);
                }}
                errorMessage={error}/>
            <Button onClick={handlePasswordSubmit} size="l">
                Submit
            </Button>
        </Flex>
        );
    }

    return <>{children}</>;
    //  return (
    //     <Flex fillWidth style={{height:'100vh'}}   justifyContent="center" alignItems="center">
    //         <Flex 
    //         style={{width:'40vw'}} 
    //         paddingY="128" 
    //         justifyContent="center">
    //             <Lottie animationData={animationData} loop={true} />
    //         </Flex>
    //     </Flex>
    //     );
    
};

export { RouteGuard };