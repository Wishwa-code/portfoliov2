"use client";

import { useState } from 'react';
import { mailchimp } from '@/app/resources'
import { Button, Flex, Heading, Input, Text, LetterFx } from '@/once-ui/components';
import { Background } from '@/once-ui/components/Background';
import { useTranslations } from 'next-intl';
import axios, { AxiosError } from 'axios';


function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }) as T;
}

type NewsletterProps = {
    display: boolean;
    title: string | JSX.Element;
    description: string | JSX.Element;
}

export const Mailchimp = (
    { newsletter }: { newsletter: NewsletterProps}
) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [response, setResponse] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('subscribed') === 'true';
        }
        return false;
    });

    const t = useTranslations();

    const handlePing = async () => {
        try {
            //for testing purposes
            // throw {
            //     response: {
            //         status: 400 // This will show "Please provide a valid email address"
            //         // status: 409 // This will show "This email is already subscribed"
            //         // status: 429 // This will show "Too many attempts"
            //     }
            // } as AxiosError;

            const res = await axios.post('/api/subscribe', {
                email: email
            });
            console.log('mailchimp subscription:', res, email);
            setResponse(res.data);
            setIsSubscribed(true);
            sessionStorage.setItem('subscribed', 'true');
            setEmail('');
        } catch (err) {
            const error = err as AxiosError;
            // Handle specific error cases with user-friendly messages
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setError('Please provide a valid email address.');
                        break;
                    case 409:
                        setError('This email is already subscribed to our newsletter.');
                        break;
                    case 429:
                        setError('Too many attempts. Please try again later.');
                        break;
                    default:
                        setError('Unable to subscribe at the moment. Please try again later.');
                }
            } else if (error.request) {
                setError('Network error. Please check your internet connection.');
            } else {
                setError('Unable to subscribe at the moment. Please try again later.');
            }
        }
    };

    const validateEmail = (email: string): boolean => {
        if (email === '') {
            return true;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateAndSetError(value);
    };

    const validateAndSetError = (value: string) => {
        if (!validateEmail(value)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const debouncedValidateAndSetError = debounce(validateAndSetError, 2000);

    const handleBlur = () => {
        setTouched(true);
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
        }
    };

    return (
        <Flex
            style={{overflow: 'hidden'}}
            position="relative"
            fillWidth padding="l"  radius="l" marginBottom="m"
            direction="column" alignItems="center" align="center"
            background="surface" border="neutral-medium" borderStyle="solid-1">
            {/* //!change this one to add color for mailchimp background*/}
            {/* <Background
                position="absolute"
                gradient={mailchimp.effects.gradient}
                dots={mailchimp.effects.dots}
                lines={mailchimp.effects.lines}/> */}
            <Heading style={{position: 'relative'}}
                marginBottom="s"
                variant="display-strong-xs">
                {newsletter.title}
            </Heading>
            <Text
                style={{
                    position: 'relative',
                    maxWidth: 'var(--responsive-width-xs)'
                }}
                wrap="balance"
                marginBottom="l"
                onBackground="neutral-medium">
                {newsletter.description}
            </Text>
            {isSubscribed ? (
                <Text>
                    <LetterFx
                    speed="medium"
                    trigger="instant"
                    charset={[
                        'X',
                        '@',
                        '$',
                        'a',
                        'H',
                        'z',
                        'o',
                        '0',
                        'y',
                        '#',
                        '?',
                        '*',
                        '0',
                        '1',
                        '+'
                    ]}
                    >
                    Thanks for subscribing !
                    </LetterFx>
                </Text>
            ) : (
                <form
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    action={handlePing}
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form">
                    <Flex id="mc_embed_signup_scroll"
                        fillWidth maxWidth={24} gap="8">
                        <Input
                            formNoValidate
                            labelAsPlaceholder
                            id="mce-EMAIL"
                            name="EMAIL"
                            type="email"
                            label="Email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                debouncedValidateAndSetError(e.target.value);
                            }}
                            onBlur={handleBlur}
                            errorMessage={error}/>
                        <div style={{display: 'none'}}> 
                            <input type="checkbox" readOnly name="group[3492][1]" id="mce-group[3492]-3492-0" value="" checked/>
                        </div>
                        <div id="mce-responses" className="clearfalse">
                            <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                            <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                        </div>
                        <div aria-hidden="true" style={{position: 'absolute', left: '-5000px'}}>
                            <input type="text" readOnly name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa" tabIndex={-1} value=""/>
                        </div>
                        <div className="clear">
                            <Flex
                                height="48" alignItems="center">
                                <Button
                                    id="mc-embedded-subscribe"
                                    value="Subscribe"
                                    size="m"
                                    fillWidth>
                                    {t("newsletter.button")}
                                </Button>
                            </Flex>
                        </div>
                    </Flex>
                </form>
            )}
        </Flex>
    )
}